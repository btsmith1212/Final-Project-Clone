/* eslint-disable no-case-declarations */
import {
    UPDATE_USER,
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART
} from './actions';


export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };

        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.product],
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if (action._id === product._id) {
                        return {
                            ...product,
                            purchaseQuantity: action.purchaseQuantity,
                        };
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
                cart: newState,
            };


        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: [],
            };

        default:
            return state;
    }
};
