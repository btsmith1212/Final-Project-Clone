import { gql } from "@apollo/client";

export const LOGIN_USER = gql `
    mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            token
            user {
                _id
                username
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


export const CREATE_PRODUCT = gql `
    mutation createProduct($input: ProductInput!) {
        createProduct(input: $input) {
            _id
            name
            price
            description
            category
        }
    }
`;

export const UPDATE_PRODUCT = gql `
    mutation updateProduct($productId: ID!, $input: ProductInput!) {
        updateProduct(productId: $productId, input: $input) {
            _id
            name
            price
            description
            category
        }
    }
`;

export const UPDATE_CART = gql `
    mutation updateCart($userId: ID!, $productId: ID!) {
        updateCart(userId: $userId, productId: $productId) {
            _id
            userId
            products {
                _id
                name
                price
                description
                category
               
            }
        }
    }
`;
