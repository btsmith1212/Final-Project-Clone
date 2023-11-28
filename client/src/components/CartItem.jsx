import { useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { REMOVE_CART } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

const CartItem = ({ item }) => {
    const [state, dispatch] = useStoreContext();
    const [ removeCart ] = useMutation(REMOVE_CART);

    const removeFromCart = async (productId) => {
        try {
            const { data } = await removeCart({
                variables: { productId }
            });

            // Remove from global state
            dispatch({
                type: REMOVE_FROM_CART,
                _id: productId
            });

            // Remove from IndexedDB
            idbPromise('cart', 'delete', { _id: productId });

            console.log("Updated Cart State:", state.cart);
        } catch(error) {
            console.error("Error removing from cart:", error);
        }
    };

    const onChange = (e) => {
        const value = e.target.value;
        const quantity = parseInt(value);

        if (quantity === 0) {
            // If the quantity is zero, remove the item from the cart
            removeFromCart(item._id);
        } else {
            // Update the quantity in the cart and IndexedDB
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    }

    return (
        <tr className="flex items-center">
            {/* <td className="lg:block hidden basis-1/4 px-4 py-3">
                <img
                    src={`/images/${item.image}`}
                    alt=""
                />
            </td> */}
            <td className="flex items-center md:flex-row basis-2/4 px-4 py-3 ">
                <div className="md:block hidden basis-1/3 mr-4 bg-gray">
                    <img
                        alt={name}
                        src={`/images/${item.image}`}
                        className="w-full h-full block"
                    />
                </div>
                <p className="basis-2/3">{item.name}</p>
            </td>
            <td className="basis-1/4 px-4 py-3">${item.price}</td>
            <td className="basis-1/4 px-4 py-3">
                <span>Qty: </span>
                <input
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={onChange}
                    className="w-8"
                />
                <button
                    role="img"
                    aria-label="trash"
                    onClick={() => removeFromCart(item._id)}
                >
                    🗑️
                </button>
            </td>
        </tr>
    );
}

export default CartItem;