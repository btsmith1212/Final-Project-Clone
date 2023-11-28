import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_PRODUCTS } from '../utils/queries';
import { DELETE_PRODUCT } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS, UPDATE_USER } from '../utils/actions';
import { idbPromise } from '../utils/helpers';


function Mypage() {
    const { data } = useQuery(QUERY_USER);
    const lists = data.user.addedProducts;

    const [ deleteProduct ] = useMutation(DELETE_PRODUCT, {
        refetchQueries: [{ query: QUERY_PRODUCTS }, { query: QUERY_USER }],
    });
    const [ state, dispatch ] = useStoreContext();


    const handleDeleteProduct = async (productId) => {
        try {
            const { data } = await deleteProduct({
                variables: { productId },
            });

            if (data.deleteProduct) {
                // Update the IndexedDB store
                idbPromise('products', 'delete', { _id: productId });

                const updatedProducts = state.products.filter((product) => product._id !== productId);
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: updatedProducts,
                });

                // Update the user's addedProducts with the deleted product removed
                const updatedUser = {
                    ...state.user,
                    addedProducts: state.user.addedProducts.filter((product) => product._id !== productId),
                };
                dispatch({
                    type: UPDATE_USER,
                    payload: updatedUser,
                });
            }
        } catch (error) {
            // Handle error
            console.error("Error deleting product:", error.message);
        }
    };

    return (
        <section className="py-14 px-5 flex flex-col justify-center">
            <h2 className="text-3xl text-center font-bold">My page</h2>
            <p className="text-center text-lg mt-4">
                On the My Page, you can easily manage the products you own. <br />
                You can conveniently review the list of added products.
            </p>

            <div className="mt-6 text-center">
                <Link to="/addProduct" className="py-4 px-5 rounded-md bg-olive text-sm text-center text-white">
                    Add my product
                </Link>
            </div>

            <div className="mt-16 text-center">
                <h3 className="text-xl text-center">My products lists</h3>
                {lists.length > 0 ? (
                    <ul className="mx-auto mt-8 max-w-lg">
                        {lists.map((list) => (
                            <li key={list._id} className="flex flex-row justify-between items-center py-3 px-4 mb-3 shadow-lg">
                                <h4 className="text-lg capitalize">{list.name}</h4>
                                <div>
                                    <Link className="px-4 py-2 bg-gray rounded-md text-sm mr-2" to={`/products/${list._id}`}>View</Link>
                                    <button
                                        className="px-4 py-2 rounded-md text-sm delete-btn"
                                        onClick={() => handleDeleteProduct(list._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="inline-block mt-5 px-6 py-7 rounded-md bg-gray text-center">
                        <span role="img" aria-label="shocked">
                            😱
                        </span>
                            You haven&apos;t added any products yet. <br />
                            Use the &apos;Add&apos; button above to add your own products!
                    </div>
                )}
            </div>
        </section>
    )
}

export default Mypage;