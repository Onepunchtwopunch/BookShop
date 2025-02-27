import axios from "axios";
import React, { useReducer } from "react";
import { BASE_URL, API } from "../common/constants";

const INIT_STATE = {
    isAuthorized: false,
    products: [],
    user: null,
    users: [],
};
// {
//     id: 1,
//     name: 'User 1',
//     email: 'test@gmail.com',
//     password: '123456'
// }

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthorized: true,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthorized: false,
                user: null,
            };
        case "REGISTER":
            return {
                ...state,
                isAuthorized: true,
                user: action.payload,
                users: [
                    ...state.users,
                    {
                        id: state.users.length + 1,
                        ...action.payload,
                    },
                ],
            };
        case "ORDER":
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

export const authContext = React.createContext();

export default function AuthContextProvider(props) {
    const { REACT_APP_API_URL: URL } = process.env;
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const login = async (data) => {
        const response = await axios.get(`${URL}/users`);
        const hasUser = response.data.find(
            (item) =>
                item.email === data.email && item.password === data.password
        );

        if (hasUser) {
            dispatch({
                type: "LOGIN",
                payload: hasUser,
            });
            // return Promise.resolve({
            //     id: hasUser.id,
            //     name: hasUser.name,
            //     email: hasUser.email
            // })
        } else {
            return Promise.error("Пользователь не найден!");
        }
    };

    const logout = () => {
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
    };

    const register = async (data) => {
        const response = await axios.post(`${URL}/users`, data);
        const registered = response.data;
        // const isSameEmail = state.user.find(item => item.email === data.email)

        dispatch({
            type: "REGISTER",
            payload: register,
        });
        return registered.data;
    };

    const order = async (data) => {
        const response = await axios.post(`${URL}/products`, data);
        const ordered = response.data;

        dispatch({
            type: "ORDER",
            payload: order,
        });
        return ordered.data;
    };

    return (
        <authContext.Provider
            value={{
                isAuthorized: state.isAuthorized,
                products: state.products,
                user: state.user,
                login,
                logout,
                register,
                order,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}
