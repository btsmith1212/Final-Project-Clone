/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { reducer } from "./reducers"

import Auth from "./auth";
import { QUERY_USER } from "../utils/queries";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        products: [],
        cart: [],
        categories: [],
        currentCategory: "",
        user: null
    });

    const { loading, data } = useQuery(QUERY_USER);
    useEffect(() => {
        if (!loading && data && Auth.loggedIn()) {
            const { user } = data;
            
            dispatch({
                type: "UPDATE_USER",
                payload: {
                    ...user,
                },
            });
        }
    }, [loading, data, dispatch]);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
