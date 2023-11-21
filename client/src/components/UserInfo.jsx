/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function UserInfo({ title, page, handleInputChange, loginFormSubmit, signupFormSubmit }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center" onSubmit={page === "Login" ? loginFormSubmit : signupFormSubmit}>
            <h2 className="text-xl text-center font-bold">{title}</h2>
            <form className="flex flex-col items-center justify-center mt-5" >
                <input className="px-3 py-2 border border-green-gray w-72" type="text" placeholder="Username" onChange={handleInputChange} />
                <input className="px-3 py-2 border border-green-gray w-72 mt-3" type="password" placeholder="Password" onChange={handleInputChange} />
                
                <button className="px-3 py-2 w-72 mt-3 bg-olive text-white cursor-pointer" type="submit">
                    {page === "Login" ? "Login" : "Signup"}
                </button>
            </form>

            {(() => {
                if (page === "Login"){
                    return <p className="text-center">Don&apos;t have an account? <Link to="/Signup" className="mt-5 text-olive">Sign up</Link></p>
                } else if (page === "Signup"){
                    return <p className="text-center">Already have an account? <Link to="/Login" className="mt-5 text-olive">Login</Link></p>
                } else {
                    return;
                }
            })()}
        </div>
    )
}

export default UserInfo;