import React, {useState, useContext} from "react";
import "./style.css";
import { Link, useParams } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const { api } = useContext(Ctx);
    const { id } = useParams(); 

    const handler = e => {
        e.preventDefault();

        api.updatePost(id, { title: title, image: image }).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data);
            if (data.message === "ok") {
                browserHistory.push('/');
            }
        })
    };
    return (
        <section className="post-creator">
            <h2 className="post-creator__title">Change the post</h2>
            <form onSubmit={handler} className="signin__form">
                <input className="signin__input" onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Your title" />
                <input className="signin__input" onChange={(e) => { setImage(e.target.value) }} type="text" placeholder="Image" />
                <button className="signin__btn" type="submit">Change</button>
            </form>
            <Link className="signin__link" to="/">Home</Link>
        </section>
    );
};

export default EditPost;