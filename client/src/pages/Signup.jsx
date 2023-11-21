import UserInfo from "../components/UserInfo";

import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";


function Signup() {
    const [userFormData, setUserFormData] = useState({ username: "", password: "" });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...userFormData }
            });

            if (!data) {
                throw new Error("something went wrong!");
            }

            const { token, user } = data.addUser;
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: "",
            password: ""
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };
    return (
        <section>
            <UserInfo title={"Signup"} page={"Signup"} signupFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} />
        </section>
    )
}

export default Signup;