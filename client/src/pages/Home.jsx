import { Link } from "react-router-dom";
import plantImg from "../assets/plant-img.svg";
import clothesImg from "../assets/clothes-img.svg";

function Home(){
    

    return (
        <>
            <div className="h-96 sm:min-h-screen relative">
                <div className="h-full bg-no-repeat bg-cover bg-center intro-bg"></div>
                <div className="absolute top-1/2 left-1/2 flex flex-col justify-center items-center px-10 w-full intro-txt">
                    <h2 className="text-xl sm:text-4xl text-center font-bold">Welcome to ShopSphere</h2>
                    <p className="mt-8 text-center text-md sm:text-lg">
                        Join us on this journey towards a more sustainable and stylish world. <br />
                        At ShopSphere, every transaction is a step towards supporting local economies, reducing waste, <br />
                        and embracing the beauty of conscious living.
                    </p>
                </div>
            </div>

            <div className="py-24 px-5">
                {/* <img className="max-w-sm" src={About} alt="pictures of books, art, plants, clothes" /> */}
                <div className="">
                    <h2 className="text-3xl text-center font-bold">About Us</h2>
                    <p className="mt-3 text-center text-lg">
                        An eco-conscious shopping experience! Our online marketplace is a platform<br/>
                        designed for those who prioritize sustainability in their consumer choices. 
                    </p>

                    <div className="sm:mt-20 mt-14 max-w-4xl mx-auto">
                        <ul>
                            <li className="flex md:flex-row flex-col justify-between items-center">
                                <img className="md:w-1/2 max-w-xs" src={plantImg} alt="two plants image" />
                                <div className="md:w-1/2">
                                    <p className="md:text-2xl text-lg ">Bring the beauty of nature <br />into your home <br /> with our vibrant plant selection</p>
                                    <Link to="/products" className="w-40 mt-5 py-4 border border-olive rounded-lg text-olive text-center bg-no-repeat duration-300 gradation">Buy Now</Link>
                                </div>
                            </li>
                            <li className="flex md:flex-row flex-col-reverse justify-between items-center mt-16">
                                <div className="md:w-1/2">
                                    <p className="md:text-2xl text-lg ">Uncover the stories<br />behind our second-hand treasures</p>
                                    <Link to="/products" className="w-40 mt-5 py-4 border border-olive rounded-lg text-olive text-center bg-no-repeat duration-300 gradation">Buy Now</Link>
                                </div>
                                <img className="md:w-1/2 max-w-xs" src={clothesImg} alt="several clothes hanging from a hanger" />
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Home;