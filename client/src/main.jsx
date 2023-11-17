import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import App from "./App.jsx"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Payment from "./pages/Payment";

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
            {
                path: "/payment",
                element: <Payment />,
            },
        ],
    },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);