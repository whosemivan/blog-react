import React, { useState, useContext } from "react";
import "./style.css";
import { Ctx } from "../App";
import browserHistory from "../../browser-history";
import { Link } from 'react-router-dom';
import TagCreator from "../TagCreator/";

const PostCreator = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState([]);

    const { userId, api } = useContext(Ctx);

    const handler = e => {
        e.preventDefault();
        api.addPost({ title: title, author: userId, image: image, tags: tags }).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data);
            if (data.message === "ok") {
                browserHistory.push('/blog-react/');
            }
        })
    };

    return (
        <section className="post-creator form-page">
            <h2 className="post-creator__title form-page__title">Create a post</h2>
            <form onSubmit={handler} className="form-page__form">
                <input className="form-page__input" onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Your title" />
                <input className="form-page__input" onChange={(e) => { setImage(e.target.value) }} type="text" placeholder="Image" />
                <TagCreator tags={tags} setTags={setTags} />
                <button className="form-page__btn" type="submit">Create a post</button>
            </form>
            <Link className="form-page__link" to="/blog-react/">Home</Link>
        </section>
    );
};

export default PostCreator;