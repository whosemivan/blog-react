import React, { useContext } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import { Ctx } from "../App";

const FirstScreen = () => {
    const { updUId, updUName, isAuth, setIsAuth } = useContext(Ctx);

    const logOut = (e) => {
        e.preventDefault();
        updUId("");
        updUName("");
        setIsAuth(false);
        localStorage.removeItem("userId");
        localStorage.removeItem("author");
    }

    return (
        <section className="first-screen">
            <h1 className="visually-hidden">Blog.</h1>
            <div className="first-screen__wrapper">
                <div className="first-screen__decorate">
                    <span className="first-screen__text">
                        Blog. Blog. Blog. Blog. Blog. Blog. Blog.
                        Blog. Blog. Blog. Blog. Blog. Blog. Blog.
                        Blog. Blog. Blog. Blog. Blog. Blog. Blog.
                        Blog. Blog. Blog. Blog. Blog. Blog.
                    </span>
                    <svg width="900" height="408" viewBox="0 0 900 408" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M897.698 217.53C883.528 269.601 777.776 291.904 709.486 326.902C656.729 353.94 612.002 386.158 544.316 398.638C475.642 411.3 401.565 408.99 332.069 396.492C260.763 383.668 201.45 358.088 148.875 327.523C86.6503 291.347 12.2845 255.034 2.61731 204.961C-7.41905 152.975 29.7801 97.3039 97.8205 63.073C161.821 30.8748 265.358 74.3886 348.832 63.3507C424.804 53.3047 487.042 -6.36323 564.348 1.38264C648.426 9.80697 720.746 40.2998 777.472 77.0817C839.402 117.238 911.933 165.224 897.698 217.53Z" fill="#0B0A08" />
                    </svg>
                </div>
                <nav className="first-screen__nav">
                    <ul className="first-screen__list">
                        {!isAuth ?
                            <li className="first-screen__item">
                                <Link className="first-screen__link" to="/signin">Auth</Link>
                            </li> :
                            <>
                            <li className="first-screen__item">
                                <button onClick={logOut}>Log Out</button>
                            </li>
                            <li className="first-screen__item">
                                <a className="first-screen__link" href="">Create Post</a>
                            </li>
                            </>
                            }

                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default FirstScreen;