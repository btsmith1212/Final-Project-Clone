import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <main className="sm:pl-60">
                <Outlet />
                <Footer />
            </main>
        </>
    );
}

export default App;