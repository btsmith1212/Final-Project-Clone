import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import logo from '../assets/logo.svg';
import Navbar from "./Navbar";


function Header() {
    const [hamburger, setHamburger] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const toggleHamburger = () => {
        setHamburger(!hamburger);
    }

    const closeNavBox = () => {
        setHamburger(false);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <header className={`fixed top-0 left-0 w-60 flex h-full bg-ivory z-20 header ${hamburger && isMobile ? "open" : ""}`}>
                <div className="m-auto flex flex-col items-center justify-center z-10">
                    <h1 className="w-32">
                        <Link to="/">
                            <img src={logo} alt="A logo with the letter 'S' written inside a circle" />
                        </Link>
                    </h1>

                    <Navbar closeNavbar={closeNavBox}/>
                </div>
            </header>

            {isMobile && (
            <>
            <div className="fixed top-0 sm:hidden flex w-full justify-between items-center px-5 py-4 bg-ivory">
                <Link to="/" className="w-24">
                    <img src={logo} alt="A logo with the letter 'S' written inside a circle" />
                </Link>

                <button className="flex flex-col justify-between h-5 hamburger"
                    type="button" onClick={toggleHamburger}
                >
                    <span className="block w-7 bg-olive line1"></span>
                    <span className="block w-7 bg-olive line2"></span>
                    <span className="block w-7 bg-olive line3"></span>
                </button>
            </div>

            <div className={`absolute top-0 left-0 z-10 w-full h-full invisible bg-overlay ${hamburger ? "open" : ""}`} onClick={closeNavBox}></div>
            </>
            )}
        </>
    );
}

export default Header;
