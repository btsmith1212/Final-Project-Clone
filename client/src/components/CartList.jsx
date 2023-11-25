// import { useEffect } from "react";
// // import { loadStripe } from "@stripe/stripe-js";
// import { useLazyQuery, useQuery } from "@apollo/client";
// import { QUERY_CHECKOUT, QUERY_USER } from "../utils/queries";
// import { idbPromise } from "../utils/helpers";
// import CartItem from "./CartItem";
// import Auth from "../utils/auth";
// import { useStoreContext } from "../utils/GlobalState";
// import { ADD_MULTIPLE_TO_CART } from "../utils/actions";

// // const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// const CartList = () => {
//     const [state, dispatch] = useStoreContext();
//     console.log(state)
//     // const [getCheckout, { data: checkoutData }] = useLazyQuery(QUERY_CHECKOUT);
//     const { data } = useQuery(QUERY_USER);
//     let user;
//     if (data) {
//         user = data.user;
//     }
//     console.log(user)


//     useEffect(() => {
//         if (data) {
//             // stripePromise.then((res) => {
//             //     res.redirectToCheckout({ sessionId: data.checkout.session });
//             // });
//         }
//     }, [data]);

//     useEffect(() => {
//         async function getCart() {
//             const cart = await idbPromise("cart", "get");
//             dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
//         }

//         if (!state.cart.length) {
//             getCart();
//         }
//     }, [state.cart.length, dispatch]);


//     // function calculateTotal() {
//     //     let sum = 0;
//     //     state.cart.forEach((item) => {
//     //         sum += item.price * item.purchaseQuantity;
//     //     });
//     //     return sum.toFixed(2);
//     // }

//     // function submitCheckout() {
//     //     const productIds = [];

//     //     state.cart.forEach((item) => {
//     //         for (let i = 0; i < item.purchaseQuantity; i++) {
//     //             productIds.push(item._id);
//     //         }
//     //     });

//     //     getCheckout({
//     //         variables: { products: productIds },
//     //     });
//     // }


//     return (
//         <>
//         {user ? (
//         <div className="cart">
//             {console.log(user.carts.length)}
//             {user.carts.length ? (
//                 <div>
//                     {user.carts.map((cart) => (
//                         <div key={cart._id}> 
//                         {cart.products.map(( item ) => (
//                             <CartItem key={item._id} item={item} />
//                         ))}
//                         </div>
//                     ))}

//                     <div className="flex-row space-between">
//                         {/* <strong>Total: ${calculateTotal()}</strong>

//                         {Auth.loggedIn() ? (
//                             <button onClick={submitCheckout}>Checkout</button>
//                         ) : (
//                             <span>(log in to check out)</span>
//                         )} */}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="mx-auto mt-16 max-w-xl px-6 py-10 bg-gray rounded-lg">
//                     <h3 className="text-center">
//                         <span role="img" aria-label="shocked">
//                             😱
//                         </span>
//                         You haven&apos;t added anything to your cart yet!
//                     </h3>
//                 </div>
//             )}
//         </div>
//         ) : null}
//         </>
//     );
// };

// export default CartList;
