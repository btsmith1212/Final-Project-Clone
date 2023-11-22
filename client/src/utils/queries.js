import { gql } from "@apollo/client";

export const GET_USER = gql `
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            _id
            username
        }
    }
`;

export const GET_PRODUCT = gql `
    query getProduct($productId: ID!) {
        getProduct(productId: $productId) {
            _id
            name
            price
            description
            category
        }
    }
`;

export const GET_CART = gql `
    query getCart($userId: ID!) {
        getCart(userId: $userId) {
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
