import React, { useState, useContext } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [isErr, setIsErr] = useState(false);
    const { updUName, updUId, api } = useContext(Ctx);

    const handler = e => {
        e.preventDefault();
        api.logIn({ email: email, password: pwd }).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data);
            if (data.message === "ok") {
                updUId(data.data._id);
                updUName(data.data.name);
                localStorage.setItem("author", data.data.name);
                localStorage.setItem("userId", data.data._id);
                localStorage.setItem("isAuth", true);
                browserHistory.push('/blog-react/');
            } else {
                setIsErr(true);
            }
            setEmail("");
            setPwd("");
        })
    };

    return (
        <div className="signin form-page">
            <h3 className="signin__title form-page__title">Sign In</h3>
            <form onSubmit={handler} className="signin__form form-page__form">
                <input className="signin__input form-page__input" onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Your email" />
                <input className="signin__input form-page__input" onChange={(e) => { setPwd(e.target.value) }} type="password" placeholder="Password" />
                {isErr ? 
                <p className="signin__err">Неправильные данные входа</p>
                : ''
                }
                <button className="signin__btn form-page__btn" type="submit">Sign In</button>
            </form>
            <Link className="signin__link form-page__link" to="/blog-react/signup">Sign Up</Link>
            <Link className="signin__link form-page__link" to="/blog-react/">Home</Link>
        </div>
    );
};

export default SignIn;