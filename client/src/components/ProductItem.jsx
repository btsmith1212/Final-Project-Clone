import { Link } from "react-router-dom";

function ProductItem(item) {
    const {
        name,
        _id,
        price,
        image,
        quantity
    } = item;

    return (
        <li className="basis-full md:basis-1/2 lg:basis-1/3 mt-5 p-2">
            <img
                alt={name}
                src={image.includes("http")?image:`/images/${image}`}
                className="w-full h-48 bg-gray"
            />
            <div className="mt-3">
                <p className="text-lg">{name}</p>
                <div>{quantity} in stock</div>
                <span>Price: ${price}</span>
            </div>

            <Link
                to={{
                    pathname: `/products/${_id}`,
                    state: { image }, // Pass the image as state
                }}
                className="mt-2 py-2 px-3 border border-olive rounded-lg text-olive text-center text-sm bg-no-repeat duration-300 gradation">View Details</Link>
        </li>
    );
}

export default ProductItem;
