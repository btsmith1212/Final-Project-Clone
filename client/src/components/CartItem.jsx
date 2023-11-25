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
            await removeCart({
                variables: { productId }
            });

            // Remove from global state
            dispatch({
                type: REMOVE_FROM_CART,
                _id: productId
            });

            // Remove from IndexedDB
            idbPromise('cart', 'delete', { _id: productId });
        } catch(error) {
            console.error("Error removing from cart:", error);
        }
    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            removeFromCart(item._id);
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

        }
    }

    return (
        <div className="flex-row">
            <div>
                {/* <img
                    src={`/images/${item.image}`}
                    alt=""
                /> */}
            </div>
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    />
                    <span
                        role="img"
                        aria-label="trash"
                        onClick={() => removeFromCart(item._id)}
                    >
                        🗑️
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;