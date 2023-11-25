import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT, QUERY_USER } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "../components/CartItem";

import { useStoreContext } from "../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
// import CartList from "../components/CartList";

import Auth from "../utils/auth";
import toast from "react-hot-toast";


function Cart() {
    const navigate = useNavigate();
    const [state, dispatch] = useStoreContext();
    const { data } = useQuery(QUERY_USER);
    console.log(state)
    useEffect(() => {
        if (data) {
            // stripePromise.then((res) => {
            //     res.redirectToCheckout({ sessionId: data.checkout.session });
            // });
        }
    }, [data]);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            toast.error("Please log in first");
            navigate("/login");
        }
    }, [navigate]);


    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise("cart", "get");
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);


    // function calculateTotal() {
    //     let sum = 0;
    //     state.cart.forEach((item) => {
    //         sum += item.price * item.purchaseQuantity;
    //     });
    //     return sum.toFixed(2);
    // }

    // function submitCheckout() {
    //     const productIds = [];

    //     state.cart.forEach((item) => {
    //         for (let i = 0; i < item.purchaseQuantity; i++) {
    //             productIds.push(item._id);
    //         }
    //     });

    //     getCheckout({
    //         variables: { products: productIds },
    //     });
    // }

    return (
        <>
        {Auth.loggedIn() && 
            <section className="py-14">
                <h2 className="text-3xl text-center font-bold">Shopping Cart</h2>
                
                {data?.user?.carts.length ? (
                    <div className="cart">
                        {data.user.carts.map((cart) => (
                            <div key={cart._id}>
                                {cart.products.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))}
                            </div>
                        ))}

                        <div className="flex-row space-between">
                            {/* <strong>Total: ${calculateTotal()}</strong>

                            {Auth.loggedIn() ? (
                                <button onClick={submitCheckout}>Checkout</button>
                            ) : (
                                <span>(log in to check out)</span>
                            )} */}
                        </div>
                    </div>    
                ) : (
                    <div className="mx-auto mt-16 max-w-xl px-6 py-10 bg-gray rounded-lg">
                        <h3 className="text-center">
                            <span role="img" aria-label="shocked">
                                😱
                            </span>
                            You haven&apos;t added anything to your cart yet!
                        </h3>
                    </div>
                )}
            </section>
        }
        </>
    )
}

export default Cart;