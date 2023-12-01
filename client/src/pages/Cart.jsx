import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "../components/CartItem";

import { useStoreContext } from "../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import spinner from "../assets/spinner.gif"

import Auth from "../utils/auth";
import toast from "react-hot-toast";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function Cart() {
    const navigate = useNavigate();
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!Auth.loggedIn()) {
            toast.error("Please log in first");
            navigate("/login");
        }
    }, [navigate]);


    useEffect(() => {
        if (data) {
            const { successUrl } = data.checkout;

            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });

            window.location.href = successUrl;
        }
    }, [data]);

    


    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise("cart", "get");
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
            setLoading(false);
        }
        

        const loadCart = async () => {
            if (!state.cart.length) {
                await getCart();
            }

            setLoading(false);
        };

        loadCart();
    }, [state.cart.length, dispatch]);


    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];
        
        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });
        
        getCheckout({
            variables: { products: productIds },
        });


    }

    return (
        <>
        {Auth.loggedIn() && 
            <section className="flex flex-col justify-center py-14 max-w-6xl mx-auto">
                <h2 className="text-3xl text-center font-bold">Shopping Cart</h2>
                {loading ? (
                    <div className="text-center mt-16">
                        <img src={spinner} alt="loading" className="inline-block w-32" />
                    </div>
                ) : state.cart.length > 0 ? (
                    <div className="flex lg:flex-row flex-col items-start justify-center mt-16 px-8">
                            <table className="basis-2/3 sm:table-fixed lg:mr-5 lg:mb-0 mb-10 w-full text-left border border-gray block overflow-x-auto">
                            <thead className="block w-full">
                                <tr className="flex">
                                    <th className="basis-1/4 px-4 py-2 text-sm sm:text-md font-normal bg-gray">Product</th>
                                    <th className="basis-1/4 px-4 py-2 text-sm sm:text-md font-normal bg-gray" colSpan="2"></th>
                                    <th className="basis-1/4 px-4 py-2 text-sm sm:text-md font-normal bg-gray">Price</th>
                                    <th className="basis-1/4 px-4 py-2 text-sm sm:text-md font-normal bg-gray">Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="block w-full">
                                {state.cart.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="w-full lg:basis-1/3 px-5 py-7 border border-gray">
                            <span className="block w-full text-xl font-bold">Cart Total</span>
                            <p className="mt-5">Total: ${calculateTotal()}</p>
                            <p className="mt-5">Delivery: Free</p>
                            <button className="mt-5 bg-olive text-white w-full py-4 font-bold" onClick={submitCheckout}>Checkout</button>
                            
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