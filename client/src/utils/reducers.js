/* eslint-disable no-case-declarations */
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };

        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                    cart: [...state.cart, action.product],
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                    cart: state.cart.map((product) => {
                        if (action._id === product._id) {
                            product.purchaseQuantity = action.purchaseQuantity;
                        }
                        return product;
                    }),
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
