import React, { useState } from "react";
import { Link } from "react-router";

function CaptainSignup () {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function onFirstNameChange ({ target: { value } }) {
        setFirstName(value);
    }

    function onLastNameChange ({ target: { value } }) {
        setLastName(value);
    }

    function onEmailChange ({ target: { value } }) {
        setEmail(value);
    }

    function onPasswordChange ({ target: { value } }) {
        setPassword(value);
    }

    function formSubmit ( e ) {
        e.preventDefault();
        console.log(firstName, lastName, email, password);
    }

    return (
        <div className="page user-login p-7">
            <form onSubmit={formSubmit}>
            <h3 className="text-xl mb-2">First name</h3>
                <input 
                    required 
                    type="text" 
                    placeholder="First name" 
                    className="bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base" 
                    onChange={onFirstNameChange} 
                    value={firstName}
                />
                <h3 className="text-xl mb-2">Last name</h3>
                <input 
                    required 
                    type="text" 
                    placeholder="Last name" 
                    className="bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base" 
                    onChange={onLastNameChange} 
                    value={lastName}
                />
                <h3 className="text-xl mb-2">Email</h3>
                <input 
                    required 
                    type="text" 
                    placeholder="Email" 
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
                <button type="submit" className="bg-[#111] text-white font-semibold mb-7 px-4 py-2 w-full text-lg">Register</button>
            </form>
            <p className="text-center mb-7">Already have an account ? <Link to="/captain-login" className="text-blue-600">Login</Link></p>
            <p className="text-center"><Link to="/signup" className="text-blue-600">Signup as Rider</Link></p>
        </div>
    )
}

export default CaptainSignup;
