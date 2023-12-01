import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"

import App from "./App.jsx"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductsDetail from "./pages/ProductsDetail"
import Cart from "./pages/Cart"
import Mypage from "./pages/Mypage"
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderSuccess from "./pages/OrderSuccess.jsx"

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
                path: "products/:id",
                element: <ProductsDetail />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "mypage",
                element: <Mypage />
            },
            {
                path: "/addProduct",
                element: <AddProduct />,
            },
            {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Signup",
                element: <Signup />,
            },
            {
                path: "/order/success",
                element: <OrderSuccess />,
            },
        ],
    },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);