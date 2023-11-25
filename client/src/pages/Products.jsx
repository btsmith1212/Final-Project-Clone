import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";

function Products() {
    return (
        <section className="py-14">
            <h2 className="text-3xl text-center font-bold">Our Products</h2>

            <div className="max-w-5xl mx-auto py-16 px-8">
                <CategoryMenu />
                <ProductList />
            </div>
        </section>
    )
}

export default Products;