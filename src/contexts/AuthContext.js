import React, { useReducer } from 'react';
import { BASE_URL, API } from '../common/constants';

const INIT_STATE = {
    isAuthorized: false,
    user: null,
    users: [
        {
            id: 1,
            name: 'User 1',
            email: 'test@gmail.com',
            password: '123456'
        }
    ]
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthorized: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthorized: false,
                user: null
            }
        case 'REGISTER':
            return {
                ...state,
                isAuthorized: true,
                user: action.payload,
                users: [...state.users, {
                    id: state.users.length + 1,
                    ...action.payload
                }]
            }
        default:
            return state;
    }
};

export const authContext = React.createContext();

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const login = (data) => {
        if (!data.email) {
            return Promise.error('Почта обьязательна!')
        }

        if (!data.password) {
            return Promise.error('Пароль обязателен!')
        }

        const hasUser = state.users.find(item => item.email === data.email && item.password === data.password)

        if (hasUser) {
            dispatch({
                type: 'LOGIN',
                payload: hasUser
            })
            return Promise.resolve({
                id: hasUser.id,
                name: hasUser.name,
                email: hasUser.email
            })
        } else {
            return Promise.error('Пользователь не найден!')
        }
    }

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
    }

    const register = async (data) => {
        if (!data.name) {
            return Promise.error('Имя обязательно')
        }

        if (!data.email) {
            return Promise.error('Почта обязательна')
        }

        if (!data.password) {
            return Promise.error('Пароль обязательно')
        }

        const isSameEmail = state.user.find(item => item.email === data.email)

        if (isSameEmail) {
            return Promise.error('Польователь с такой почтой уже существует!')
        } else {
            dispatch({
                type: 'REGISTER',
                payload: data
            })
        }


    }

    return (
        <authContext.Provider
            value={{
                isAuthorized: state.isAuthorized,
                user: state.user,
                login,
                logout,
                register
            }}
        >
            {props.children}
        </authContext.Provider>
    );
}
