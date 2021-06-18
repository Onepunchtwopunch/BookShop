import { IconButton, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Loader from "../../components/Loader";
import { storeContext } from "../../contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";
import ProductSlider from "./components/ProductSlider";
import classes from "./productDetail.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useConfirm } from "material-ui-confirm";
import { notifySuccess } from "../../helpers/notifiers";

export default function ProductDetailPage() {
    const { fetchProductDetail, productDetail, deleteProduct } =
        useContext(storeContext);

    const { id } = useParams();
    const confirm = useConfirm();
    const history = useHistory();

    useEffect(() => {
        fetchProductDetail(id);
    }, [id]);

    const handleProductDelete = () => {
        confirm({
            description: "Удалить данный товар?",
        }).then(() => {
            deleteProduct(id).then(() => {
                notifySuccess("Товар был успешно удален!");
                history.push("/");
            });
        });
    };
    console.log();

    return (
        <MainLayout>
            {productDetail ? (
                <div className={classes.container}>
                    <ProductSlider images={productDetail.images} />

                    <div>
                        <IconButton onClick={handleProductDelete}>
                            <DeleteIcon />
                        </IconButton>

                        <IconButton
                            onClick={() =>
                                history.push(`/products/${id}/update`)
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    </div>

                    <Typography
                        style={{
                            textAlign: "center",
                            display: "inline-flex",
                            alignItems: "baseline",
                            fontWeight: "bold",
                        }}
                        variant="h1"
                    >
                        {productDetail.title}
                    </Typography>
                    <Typography
                        style={{ textAlign: "end", marginTop: 30 }}
                        variant="h3"
                    >
                        {productDetail.author}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: "end",
                            fontWeight: "bold",
                            fontStyle: "oblique",
                        }}
                        variant="h4"
                    >
                        {productDetail.genre}
                    </Typography>

                    <Typography
                        style={{ textAlign: "start" }}
                        fontWeight="fontWeightLight"
                        variant="h4"
                    >
                        {productDetail.description}
                    </Typography>
                    <Typography
                        style={{ textAlign: "end", color: "green" }}
                        variant="h4"
                    >
                        {productDetail.price} kgz som
                    </Typography>
                </div>
            ) : (
                <Loader />
            )}
        </MainLayout>
    );
}
