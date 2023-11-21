import Products from "./Products";

function Home(){
    return (
        <>
            <div className="h-96 sm:min-h-screen relative">
                <div className="h-full bg-no-repeat bg-cover bg-center intro-bg"></div>
                <div className="absolute top-1/2 left-1/2 flex flex-col justify-center items-center px-10 w-full intro-txt">
                    <h2 className="text-xl sm:text-4xl text-center font-bold">Welcome to ShopShpere</h2>
                    <p className="mt-8 text-center text-md sm:text-lg">
                        Join us on this journey towards a more sustainable and stylish world. <br />
                        At ShopShpere, every transaction is a step towards supporting local economies, reducing waste, <br />
                        and embracing the beauty of conscious living.
                    </p>
                </div>
            </div>

            <Products />
        </>
    )
}

export default Home;