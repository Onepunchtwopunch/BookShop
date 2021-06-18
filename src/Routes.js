import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BrandPage from "./Views/BrandPage/BrandPage";
import MainPage from "./Views/MainPage/MainPage";
import ProductCreatePage from "./Views/ProductCreatePage/ProductCreatePage";
import ProductDetailPage from "./Views/ProductDetailPage/ProductDetailPage";
import ProductUpdatePage from "./Views/ProductUpdatePage/ProductUpdatePage";
import SearchResultPage from "./Views/SearchResultPage/SearchResultPage";
import Cart from "./components/Cart/Cart";
import Login from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer/Footer";
import Order from "./components/Order/index";

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/Order" component={Order} exact />
                <Route path="/" component={MainPage} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={SignUp} exact />
                <Route
                    path="/products/create"
                    component={ProductCreatePage}
                    exact
                />
                <Route
                    path="/products/search/:searchValue"
                    component={SearchResultPage}
                    exact
                />
                <Route
                    path="/products/:id"
                    component={ProductDetailPage}
                    exact
                />
                <Route
                    path="/products/:id/update/"
                    component={ProductUpdatePage}
                    exact
                />
                <Route path="/brand/:id" component={BrandPage} exact />

                <Route path="/cart" component={Cart} exact />
            </Switch>
            <Footer />
        </Router>
    );
}
