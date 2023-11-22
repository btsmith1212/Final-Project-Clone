/* eslint-disable no-case-declarations */
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CATEGORIES,
    REMOVE_FROM_CART,
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                    cart: [...state.cart, action.product],
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter((product) => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                    cart: newState,
            };

        default:
            return state;
    }
};
