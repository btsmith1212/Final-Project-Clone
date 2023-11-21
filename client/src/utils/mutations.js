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
