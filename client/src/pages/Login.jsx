import UserInfo from "../components/UserInfo";

import { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
    const [userFormData, setUserFormData] = useState({ username: "", password: "" });
    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { ...userFormData },
            });

            Auth.login(data.loginUser.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex flex-col justify-center items-center">
            <UserInfo title={"Login"} page={"Login"} loginFormSubmit={handleFormSubmit} handleInputChange={handleInputChange}/>
        </section>
    )
}

export default Login;