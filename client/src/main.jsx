import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import App from "./App.jsx"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            // {
            //     path: "/payment",
            //     element: <Payment />,
            // },
            {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Signup",
                element: <Signup />,
            },
        ],
    },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);