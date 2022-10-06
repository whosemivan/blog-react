import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { Link, useParams } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";
import TagCreator from "../TagCreator/";

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const { api } = useContext(Ctx);
    const { id } = useParams();
    const [tags, setTags] = useState([]);
    const [data, setData] = useState();
    const [isLoad, setIsLoad] = useState(false);

    console.log(title);
    useEffect(() => {
        api.getPost(id).then(res => res.json()).then(data => {
            setData(data.data);
            setIsLoad(true);
            setTags(data.data.tags);
            setTitle(data.data.title);
            setImage(data.data.image);
        })
    }, [api, id]);


    const handler = e => {
        e.preventDefault();

        api.updatePost(id, { title: title, image: image, tags: tags }).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data);
            if (data.message === "ok") {
                browserHistory.push('/blog-react/');
            }
        })
    };
    return (
        <section className="form-page">
            <h2 className="form-page__title">Change the post</h2>
            <form onSubmit={handler} className="form-page__form">
                {isLoad ?
                    <>
                        <input className="form-page__input" onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Your title" defaultValue={data.title} />
                        <input className="form-page__input" onChange={(e) => { setImage(e.target.value) }} type="text" placeholder="Image" defaultValue={data.image} />
                        <TagCreator tags={tags} setTags={setTags} />
                    </> : <p>Загрузка...</p>
                }
                <button className="form-page__btn" type="submit">Change</button>
            </form>
            <Link className="form-page__link" to="/blog-react/">Home</Link>
        </section>
    );
};

export default EditPost;