import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { useStoreContext } from "../utils/GlobalState";
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";

import { QUERY_USER, QUERY_PRODUCTS } from "../utils/queries";
import { ADD_CART } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

import Auth from "../utils/auth";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function ProductsDetail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const location = useLocation();
  const { image } = location;

  // Use the useQuery hook for QUERY_USER
  const { data: userData } = useQuery(QUERY_USER);
  const { data } = useQuery(QUERY_PRODUCTS);

  const [addCart] = useMutation(ADD_CART);
  const navigate = useNavigate();

  const [currentProduct, setCurrentProduct] = useState();
  console.log(currentProduct);
  useEffect(() => {
    // retrieved from server
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });

      setCurrentProduct(data.products.find((product) => product._id === id));
    }
    // get cache from idb
    else if (!state.products.length) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }

    // Retrieve cart from IndexedDB and merge with current state
    idbPromise("cart", "get").then((indexedCart) => {
      if (indexedCart !== undefined) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          cart: indexedCart,
        });
      }
    });
  }, [data, state.products.length, dispatch, id]);

  const addToCart = async () => {
    if (!Auth.loggedIn()) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }

    try {
      const { data } = await addCart({
        variables: { productId: id },
      });

      const updatedProductInCart = data.addCart.cart.products.find(
        (product) => product._id === id
      );

      const isProductInCart = state.cart.find((item) => item._id === id);
      console.log(isProductInCart);
      if (isProductInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: isProductInCart.purchaseQuantity + 1,
        });
        // Update the quantity in IndexedDB
        idbPromise("cart", "put", {
          ...updatedProductInCart,
          purchaseQuantity: isProductInCart.purchaseQuantity + 1,
        });
      } else {
        // If the product is not in the cart, add it with the quantity
        dispatch({
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1 },
        });
        idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
      }

      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center px-5">
      {currentProduct ? (
        <div className="max-w-5xl">
          <Link to="/products">← Back to Products</Link>

          <div className="flex md:flex-row flex-col justify-center items-center mt-10">
            <div className="basis-1/2">
              <img
                src={
                  currentProduct.image.includes("http")
                    ? currentProduct.image
                    : `/images/${currentProduct.image}`
                }
                alt={currentProduct.name}
                className="w-full h-full"
              />
            </div>

            <div className="basis-1/2 md:pl-10">
              <h2 className="md:mt-0 mt-5 text-2xl font-bold">
                {currentProduct.name}
              </h2>
              <p className="mt-5">{currentProduct.description}</p>
              <p className="mt-7 text-lg">
                <strong>Price:</strong>${currentProduct.price}{" "}
              </p>

              <button
                className="mt-7 py-3 px-5 border border-olive rounded-lg text-olive text-center text-sm bg-no-repeat duration-300 gradation"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default ProductsDetail;
