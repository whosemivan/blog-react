import React, { useState, useContext } from "react";
import "./style.css";
import { Ctx } from "../App";
import browserHistory from "../../browser-history";
import { Link } from 'react-router-dom';

const PostCreator = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const { userId, updUName, updUId, api } = useContext(Ctx);

    const handler = e => {
        e.preventDefault();
        api.addPost({ title: title, author: userId, image: image }).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data);
            if (data.message === "ok") {
                browserHistory.push('/');
            }
        })
    };

    return (
        <section className="post-creator">
            <h2 className="post-creator__title">Создать пост</h2>
            <form onSubmit={handler} className="signin__form">
                <input className="signin__input" onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Your title" />
                <input className="signin__input" onChange={(e) => { setImage(e.target.value) }} type="text" placeholder="Image" />
                <button className="signin__btn" type="submit">Create Post</button>
            </form>
            <Link className="signin__link" to="/">Home</Link>
        </section>
    );
};

export default PostCreator;