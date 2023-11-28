import { gql } from "@apollo/client";

export const LOGIN_USER = gql `
    mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation registerUser($username: String!, $password: String!) {
        registerUser(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_CART = gql `
    mutation addCart($productId: ID!) {
        addCart(productId: $productId) {
            _id
            cart {
                products {
                    _id
                    name
                    description
                    price
                    quantity
                    category {
                        name
                    }
                }
            }
        }
    }
`;

export const REMOVE_CART = gql `
    mutation removeCart($productId: ID!) {
        removeCart(productId: $productId) {
            _id
            cart {
                products {
                    _id
                    name
                    description
                    price
                    quantity
                    category {
                        name
                    }
                }
            }
        }
    }
`;

export const CREATE_PRODUCT = gql `
    mutation createProduct($input: ProductInput!) {
        createProduct(input: $input) {
            _id
            name
            price
            image
            description
            quantity
            category {
                name
            }
        }
    }
`;

export const DELETE_PRODUCT = gql `
    mutation createProduct($productId: ID!) {
        deleteProduct(productId: $productId) {
            _id
        }
    }
`;

export const UPDATE_CART = gql `
    mutation updateCart($productId: ID!, $quantity: Int!) {
        updateCart(productId: $productId, quantity: $quantity) {
            _id
            cart {
                _id
                products {
                    _id
                    name
                    price
                    description
                    purchaseQuantity
                    category {
                        name
                    }
                }
            }
        }
    }
`;
