import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import HeroSlider from "../../components/HeroSlider";
import Loader from "../../components/Loader";
import ProductsList from "../../components/ProductsList";
import { storeContext } from "../../contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function BrandPage() {
    const { id } = useParams();
    const { products, fetchBrandProducts, fetchBrandDetail, brandDetail } =
        useContext(storeContext);

    useEffect(() => {
        fetchBrandProducts(id);
    }, [id]);

    return (
        <MainLayout>
            {products.length ? (
                <>
                    <ProductsList products={products} />
                </>
            ) : (
                <Loader />
            )}
        </MainLayout>
    );
}
