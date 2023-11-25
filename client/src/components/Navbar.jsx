/* eslint-disable react/prop-types */
import Auth from "../utils/auth";
import { Link, useLocation } from "react-router-dom";

function NavItem({ to, text, currentPage, closeNavbar, logoutClick }) {
    return (
        <li className="mb-5">
            <Link
                to={to}
                className={`text-lg hover:text-olive duration-500 ${currentPage === to ? "text-olive" : ""}`}
                onClick={() => {
                    if (logoutClick) {
                        logoutClick()
                    }
                    closeNavbar
                }}
            >
                {text}
            </Link>
        </li>
    );
}

function AuthButton({ closeNavbar }) {
    const isLoggedIn = Auth.loggedIn();
    const currentPage = useLocation().pathname;

    if (isLoggedIn) {
        return (
            <>
                {/* <Link to="/" className="text-lg hover:text-olive duration-500" onClick={() => Auth.logout()}>Logout</Link> */}
                <NavItem to="/" text="Logout" logoutClick={() => Auth.logout()} />
                <NavItem to="/post" text="Add Product" currentPage={currentPage} closeNavbar={closeNavbar} />
            </>
        );
    } else {
        return (
            <NavItem to="/login" text="Login" currentPage={currentPage} closeNavbar={closeNavbar} />
        );
    }
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
                    <NavItem to="/cart" text="Cart" currentPage={currentPage} closeNavbar={closeNavbar} />
                    <AuthButton closeNavbar={closeNavbar} />
                </ul>
            </div>
        </>
    );
}

export default Navbar;
