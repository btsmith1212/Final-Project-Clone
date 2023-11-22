import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="w-full px-4 text-center footer">
            <div className="py-5 border-t border-green-gray">
                <ul className="mb-3">
                    <Link to="https://github.com/YISEO" target="_blank" 
                        className="mr-7 text-sm hover:font-bold"
                    >
                        Joy Kwon
                    </Link>
                    <Link to="https://github.com/mLek10" target="_blank" 
                        className="mr-7 text-sm hover:font-bold"
                    >
                        Emily Caton
                    </Link>
                    <Link to="https://github.com/btsmith1212" target="_blank" 
                        className="text-sm hover:font-bold"
                    >
                        Blake Smith
                    </Link>
                </ul>
                <p className="text-sm">&copy; 2023 All Rights Reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
