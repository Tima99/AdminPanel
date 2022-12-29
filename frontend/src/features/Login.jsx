import React from "react";
import { useState } from "react";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { login } from "../api/request";
import { Link } from "react-router-dom";

export function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [SubmitHandler, msg] = useSubmitForm({
        data: loginData,
        api: login,
        navigateTo: '/home'
    });

    function changeHandler(e) {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <form action="">
            <div>
                <h1>Login</h1>
                <Link to={'/'}>Register</Link>
            </div>
            <div>&nbsp;{msg}&nbsp;</div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    onChange={changeHandler}
                    value={loginData.email}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    onChange={changeHandler}
                    value={loginData.password}
                />
            </div>
            <button onClick={SubmitHandler}>Login</button>
        </form>
    );
}
