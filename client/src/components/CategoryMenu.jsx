import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';
import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function CategoryMenu() {
    const [state, dispatch] = useStoreContext();
    const { categories, currentCategory } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories,
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
        });
    };

    return (
        <div className="p-2 text-center">
            <h3 className="text-lg">Category:</h3>
            <div className="mt-2">
                <button
                    className={`hover:text-olive ${!currentCategory ? 'text-olive' : ''}`}
                    onClick={() => {
                        handleClick('');
                    }}
                >
                    All
                </button>

                {categories.map((item) => (
                    <button
                        className={`ml-8 hover:text-olive relative category ${currentCategory === item._id ? 'text-olive' : ''}`}
                        key={item._id}
                        onClick={() => {
                            handleClick(item._id);
                        }}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryMenu;
