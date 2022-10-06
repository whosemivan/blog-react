import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const { updUName, updUId, api } = useContext(Ctx);

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
                localStorage.setItem("author", data.data.name);
                localStorage.setItem("userId", data.data._id);
                localStorage.setItem("isAuth", true);
                browserHistory.push('/blog-react');
            }
            setEmail("");
            setName("");
            setPwd("");
        })
    };

    return (
        <section className="signup form-page">
            <h1 className="form-page__title">Sign Up</h1>
            <form onSubmit={handler} className="form-page__form">
                <input className="form-page__input" onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" />
                <input className="form-page__input" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Your email" />
                <input className="form-page__input" onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Password" />
                <button className="form-page__btn" type="submit">Sign Up</button>
            </form>
            <Link className="form-page__link" to="/blog-react/signin">Sign In</Link>
            <Link className="form-page__link" to="/blog-react">Home</Link>
        </section>
    );
};

export default SignUp;