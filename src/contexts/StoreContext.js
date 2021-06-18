import axios from "axios";
import React, { useReducer } from "react";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";
import { BASE_URL, API } from "../common/constants";

const INIT_STATE = {
    products: [],
    brands: [],
    brandDetail: null,
    productDetail: null,
    total: 0,
    cart: {},
    categories: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload.data,
                total: action.payload.total,
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
            };
        case "SET_PRODUCT_DETAIL":
            return {
                ...state,
                productDetail: action.payload,
            };
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case "REMOVE_PRODUCT":
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
            };
        case "CLEAR_PRODUCT":
            return {
                ...state,
                productDetail: null,
            };
        case "SET_BRANDS":
            return {
                ...state,
                brands: action.payload,
            };
        case "SET_BRAND_DETAIL":
            return {
                ...state,
                brandDetail: action.payload,
            };
        case "GET_CART":
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
};

export const storeContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function StoreContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}${API.categories}`);

            dispatch({
                type: "SET_CATEGORIES",
                payload: data.filter((item) => item.parent === null),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const fetchProducts = async (page = 0) => {
        try {
            const response = await axios.get(
                `${URL}/products?_start=${page * 3}&_end=${3 * (page + 1)}`
            );
            const products = response.data;
            const total = response.headers["x-total-count"];

            dispatch({
                type: "SET_PRODUCTS",
                payload: {
                    data: products,
                    total,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchProductsAll = async (page = 0) => {
        try {
            const response = await axios.get(
                `${URL}/products?_start=${page * 6}&_end=${6 * (page + 1)}`
            );
            const products = response.data;
            const total = response.headers["x-total-count"];

            dispatch({
                type: "SET_PRODUCTS",
                payload: {
                    data: products,
                    total,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    const fetchSearchProducts = async (value) => {
        const response = await axios.get(`${URL}/products/?q=${value}`);
        const products = response.data;
        const total = response.headers["x-total-count"];
        dispatch({
            type: "SET_PRODUCTS",
            payload: {
                data: products,
                total,
            },
        });
    };

    const fetchProductDetail = async (id) => {
        const response = await axios.get(`${URL}/products/${id}`);
        const productDetail = response.data;
        dispatch({
            type: "SET_PRODUCT_DETAIL",
            payload: productDetail,
        });
    };

    const createProduct = async (product) => {
        const response = await axios.post(`${URL}/products`, product);
        const createdProduct = response.data;

        dispatch({
            type: "ADD_PRODUCT",
            payload: createdProduct,
        });

        return createdProduct.id;
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${URL}/products/${id}`);
        dispatch({
            type: "REMOVE_PRODUCT",
            payload: id,
        });
    };

    const updateProduct = async (id, data) => {
        await axios.patch(`${URL}/products/${id}`, data);
        dispatch({
            type: "CLEAR_PRODUCT",
        });
    };

    const fetchBrands = async () => {
        const response = await axios.get(`${URL}/brands`);
        const brands = response.data;
        dispatch({
            type: "SET_BRANDS",
            payload: brands,
        });
    };
    const fetchBrandProducts = async (brandId) => {
        const response = await axios.get(`${URL}/products?genre=${brandId}`);
        const products = response.data;
        const total = response.headers["x-total-count"];
        dispatch({
            type: "SET_PRODUCTS",
            payload: {
                data: products,
                total,
            },
        });
    };
    const fetchBrandDetail = async (brandId) => {
        const response = await axios.get(`${URL}/brands/${brandId}`);
        const brand = response.data;

        dispatch({
            type: "SET_BRAND_DETAIL",
            payload: brand,
        });
    };

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0,
            };
        }
        dispatch({
            type: "GET_CART",
            payload: cart,
        });
    };

    const addProductToCart = (product) => {
        console.log(product);
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0,
            };
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0, //cena tolko za odin tovar
        };

        //если кликнутый продукт есть в корзине, то удаляем, а если нет то пушим
        let filteredCart = cart.products.filter(
            (elem) => elem.item.id === product.id
        );
        if (filteredCart.length > 0) {
            cart.products = cart.products.filter(
                (elem) => elem.item.id !== product.id
            );
        } else {
            cart.products.push(newProduct);
        }

        newProduct.subPrice = calcSubPrice(newProduct);
        cart.totalPrice = calcTotalPrice(cart.products);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const changeProductCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.products = cart.products.map((elem) => {
            if (elem.item.id === id) {
                elem.count = count; //uvel count na odin
                elem.subPrice = calcSubPrice(elem);
            }
            return elem;
        });
        cart.totalPrice = calcTotalPrice(cart.products); //vsua summa korz
        localStorage.setItem("cart", JSON.stringify(cart));
        getCart();
    };

    return (
        <storeContext.Provider
            value={{
                products: state.products,
                total: state.total,
                productDetail: state.productDetail,
                brands: state.brands,
                cart: state.cart,
                categories: state.categories,
                fetchProducts,
                fetchProductsAll,
                fetchProductDetail,
                createProduct,
                deleteProduct,
                updateProduct,
                fetchSearchProducts,
                fetchBrands,
                fetchBrandProducts,
                fetchBrandDetail,
                getCart,
                addProductToCart,
                changeProductCount,
                fetchCategories,
            }}
        >
            {props.children}
        </storeContext.Provider>
    );
}
