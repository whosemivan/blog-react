import React, { useState, useContext } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const { updUName, updUId, api, setIsAuth } = useContext(Ctx);

    const handler = e => {
        e.preventDefault();
        api.logIn({ email: email, password: pwd }).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data);
            if (data.message === "ok") {
                updUId(data.data._id);
                updUName(data.data.name);
                setIsAuth(true);
                localStorage.setItem("author", data.data.name);
                localStorage.setItem("userId", data.data._id);
                browserHistory.push('/');
            }
            setEmail("");
            setPwd("");
        })
    };

    return (
        <div className="signin">
            <h3 className="signin__title">Sign In</h3>
            <form onSubmit={handler} className="signin__form">
                <input className="signin__input" onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Your email" />
                <input className="signin__input" onChange={(e) => { setPwd(e.target.value) }} type="password" placeholder="Password" />
                <button className="signin__btn" type="submit">Sign In</button>
            </form>
            <Link className="signin__link" to="/signup">Sign Up</Link>
            <Link className="signin__link" to="/">Home</Link>
        </div>
    );
};

export default SignIn;