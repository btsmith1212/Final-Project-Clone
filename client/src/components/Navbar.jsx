import { Link, useLocation } from "react-router-dom";
// import hamburgerIcon from "../assets/hamburger.png";
// import { useState } from "react";

function Navbar() {
    const currentPage = useLocation().pathname;
    // const [hamburger, setHamburger] = useState(false);

    // const toggleHamburger = () => {
    //     setHamburger(!hamburger);
    // }

    return (
        <>
            <div className="">
                <ul className="flex flex-col sm:flex-row nav nav-bars">
                    <li className="ml-10">
                        <Link to="/" className={currentPage === "/" ? "text-gold" : "hover:text-gold duration-500"}>
                            Home
                        </Link>
                    </li>
                    <li className="ml-10">
                        <Link to="/products" className={currentPage === "/products" ? "text-gold" : "hover:text-gold duration-500"}>
                            Products
                        </Link>
                    </li>
                    <li className="ml-10">
                        <Link to="/payment" className={currentPage === "/payment" ? "text-gold" : "hover:text-gold duration-500"}>
                            Payment
                        </Link>
                    </li>
                    <li className="ml-10">
                        <Link to="/cart" className={currentPage === "/cart" ? "text-gold" : "hover:text-gold duration-500"}>
                            Cart
                        </Link>
                    </li>
                </ul>
            </div>


            {/* <button className="hamburger sm:hidden w-7" type="button" onClick={toggleHamburger}>
                <img src={hamburgerIcon} alt="hamburger menu" />
            </button> */}
        </>
    );
}

export default Navbar;
