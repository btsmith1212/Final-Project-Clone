import { Outlet } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StoreProvider } from "./utils/GlobalState";
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';

import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: "/graphql",
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

// Function to handle image upload
const handleImageUpload = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    // Appending required fields for cloudinary upload
    data.append("upload_preset", "home-upload");
    data.append("cloud_name", "dkxi93m71");
    // Posting request to cloudinary API
    try {
        const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method: "POST",
            body: data,
        });
        const imageData = await response.json();
        // Do something with the image data (e.g., set it in the state)
        console.log("Image data:", imageData);
    } catch (error) {
        console.error("Error uploading image:", error);
    }
};


function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Perform any necessary loading logic here
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulating a 2-second loading time for demonstration purposes
    }, []);

    useEffect(() => {
        if (!loading) {
            // Add classes to trigger your CSS animations after loading
            document.querySelector(".header > div").classList.add("slideIn");
        }
    }, [loading]);


    return (
        <ApolloProvider client={client}>
            <StoreProvider>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                    <Header />
                    <main className="sm:pl-60">
                        <Outlet handleImageUpload={handleImageUpload} />
                        <Footer />
                    </main>
                    <Toaster />
                    </>
                )}
            </StoreProvider>
        </ApolloProvider>
    );
}

export default App;