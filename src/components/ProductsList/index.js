import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductItem from "../ProductItem";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

export default function ProductsList({ products }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <h1
                    style={{
                        color: "black",
                        textAlign: "center",
                        font: 54,
                        color: "red",
                    }}
                >
                    BESTSELLERS
                </h1>
            </div>
            <Grid
                spacing={2}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                {products.map((product) => (
                    <Grid
                        key={product.id}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <ProductItem data={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
