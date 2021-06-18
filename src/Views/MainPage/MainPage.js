import React, { useContext, useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider/";
import ProductsList from "../../components/ProductsList";
import ProductsPagination from "../../components/ProductsPagination";
import { storeContext } from "../../contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";
import HeroImg from "../../assets/images/heroBook3.jpeg";
import HeroImg2 from "../../assets/images/heroBook3.jpeg";
import HeroImg3 from "../../assets/images/heroBook3.jpeg";
import ProductsListAll from "../../components/ProductsList/index2";

export default function MainPage() {
    const { products, fetchProducts, fetchProductsAll, total } =
        useContext(storeContext);
    const [page, setPage] = useState(1);
    const [pageAll, setPageAll] = useState(1);

    useEffect(() => {
        fetchProducts(page - 1);
        fetchProductsAll(page - 1);
    }, [page]);

    const heroSlider = [
        { src: HeroImg, title: "hero" },
        { src: HeroImg2, title: "hero" },
        { src: HeroImg3, title: "hero" },
    ];

    let arr = [...products];
    let bestsellers = arr.sort((a, b) => a.sold - b.sold);

    return (
        <MainLayout>
            <HeroSlider slider={heroSlider} />
            <ProductsList products={bestsellers} />
            <ProductsPagination
                setPage={setPage}
                page={page}
                count={Math.ceil(total / 3)}
            />
            <ProductsListAll products={products} />
            <ProductsPagination
                setPage={setPageAll}
                page={pageAll}
                count={Math.ceil(total / 6)}
            />
        </MainLayout>
    );
}
