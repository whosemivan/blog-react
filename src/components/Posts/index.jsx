import React, { useState, useContext } from "react";
import Post from "../Post";
import "./style.css";
import { Ctx } from "../App";

const Posts = () => {
    const [posts, setPosts] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const {api} = useContext(Ctx);

    api.getPosts()
        .then((res) => res.json())
        .then((data) => {
            setPosts(data.data);
            setIsLoad(true);
        });


    return (
        <section className="posts">
            <h2 className="visually-hidden">Посты</h2>
            <div className="posts__wrapper">
                <div className="posts__filter">
                    <form className="posts__filter-form">
                        <input className="posts__filter-input" type="text" placeholder="Search..." />
                    </form>
                    <div className="posts__filter-tags">
                        <h3 className="posts__filter-tags-title">Tags:</h3>
                        <button className="posts__filter-btn">Tag</button>
                        <button className="posts__filter-btn">Tag</button>
                        <button className="posts__filter-btn">Tag</button>
                        <button className="posts__filter-btn">Tag</button>
                    </div>
                </div>
                <div className="posts__posts">
                    {isLoad ? posts.map((post) => {
                        return <Post key={post._id} post={post}></Post>
                    }) : <p>Загрузка...</p>}
                </div>
            </div>
        </section>
    );
};

export default Posts;