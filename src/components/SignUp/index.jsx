import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const { updUName, updUId, api, setIsAuth } = useContext(Ctx);

    const handler = e => {
        e.preventDefault();

        api.signUp({
            name: name,
            password: pwd,
            email: email
        }).then(res => res.json()).then(data => {
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
            setName("");
            setPwd("");
        })
    };

    return (
        <section className="signin">
            <h1 className="signin__title">Sign Up</h1>
            <form onSubmit={handler} className="signin__form">
                <input className="signin__input" onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" />
                <input className="signin__input" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Your email" />
                <input className="signin__input" onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Password" />
                <button className="signin__btn" type="submit">Sign Up</button>
            </form>
            <Link className="signin__link" to="/signin">Sign In</Link>
            <Link className="signin__link" to="/">Home</Link>
        </section>
    );
};

export default SignUp;