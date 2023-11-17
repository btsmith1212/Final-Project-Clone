import { Link } from 'react-router-dom';
// import tempImage from '../assets/react.svg';
import Navbar from "./Navbar";


function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-white">
            <div className="m-auto flex justify-between items-center max-w-6xl py-3.5 px-5">
                <h1 className="w-10">
                    <Link to="/">
                        ShopSphere
                    </Link>
                </h1>
                <Navbar />
            </div>
        </header>
    );
}

export default Header;
