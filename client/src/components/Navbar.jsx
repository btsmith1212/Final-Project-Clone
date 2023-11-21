/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

function NavItem({ to, text, currentPage, closeNavbar }) {
    return (
        <li className="mb-5">
            <Link
                to={to}
                className={`text-lg hover:text-olive duration-500 ${currentPage === to ? "text-blue" : ""}`}
                onClick={closeNavbar}
            >
                {text}
            </Link>
        </li>
    );
}

function Navbar({ closeNavbar }) {
    const currentPage = useLocation().pathname;

    return (
        <>
            {/* navigation bar */}
            <div className="mt-10">
                <ul className="flex flex-col nav nav-bars">
                    <NavItem to="/" text="Home" currentPage={currentPage} closeNavbar={closeNavbar} />
                    <NavItem to="/products" text="Products" currentPage={currentPage} closeNavbar={closeNavbar} />
                    <NavItem to="/payment" text="Payment" currentPage={currentPage} closeNavbar={closeNavbar} />
                    <NavItem to="/cart" text="Cart" currentPage={currentPage} closeNavbar={closeNavbar} />
                </ul>
            </div>

            {/* login button */}
            <div className="mt-10 w-full text-center">
                <Link to="/login" className="px-3 py-4 border border-olive rounded-lg text-olive bg-no-repeat duration-300 login-btn" onClick={closeNavbar}>Log In</Link>
            </div>
        </>
    );
}

export default Navbar;
