import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      username
      cart {
        _id
        products {
          _id
          name
          description
          price
          quantity
          image
          purchaseQuantity
        }
      }
      addedProducts {
        _id
        name
      }
    }
  }
`;


export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CHECKOUT = gql `
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

