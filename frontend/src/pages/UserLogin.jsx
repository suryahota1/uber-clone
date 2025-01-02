import React, { useState } from "react";
import { Link } from "react-router";

function UserLogin () {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function onEmailChange ({ target: { value } }) {
        console.log(value);
        setEmail(value);
    }

    function onPasswordChange ({ target: { value } }) {
        setPassword(value);
    }

    function formSubmit ( e ) {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div className="page user-login p-7">
            <form onSubmit={formSubmit}>
                <h3 className="text-xl mb-2">What is your email</h3>
                <input 
                    required 
                    type="email" 
                    placeholder="example@eml.com" 
                    className="bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base" 
                    onChange={onEmailChange} 
                    value={email}
                />
                <h3 className="text-xl mb-2">Enter password</h3>
                <input 
                    required 
                    type="password" 
                    placeholder="password" 
                    className="bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base" 
                    onChange={onPasswordChange} 
                    value={password}
                />
                <button type="submit" className="bg-[#111] text-white font-semibold mb-7 px-4 py-2 w-full text-lg">Login</button>
            </form>
            <p className="text-center mb-7">New here? <Link to="/signup" className="text-blue-600">Create New Account</Link></p>
            <p className="text-center"><Link to="/captain-login" className="text-blue-600">Login as captain</Link></p>
        </div>
    )
}

export default UserLogin;