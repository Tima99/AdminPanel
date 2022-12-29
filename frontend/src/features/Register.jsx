import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/request";
import { useSubmitForm } from "../hooks/useSubmitForm";

export function Register() {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [SubmitHandler, msg] = useSubmitForm({
        data: registerData,
        api: register,
    });

    function changeHandler(e) {
        setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <form action="">
            <div>
                <h1>Register</h1>
                <Link to={'/login'}>Login</Link>
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
                    value={registerData.email}
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
                    value={registerData.password}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    required
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={changeHandler}
                    value={registerData.confirmPassword}
                />
            </div>
            <button onClick={SubmitHandler}>Register</button>
        </form>
    );
}
