import React, { useState, useContext, useEffect } from "react";
import Post from "../Post";
import "./style.css";
import { Ctx } from "../App";
import { remove } from "../../utils.js";

const Posts = () => {
    const [posts, setPosts] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const [postTags, setPostTags] = useState([]);
    const [querySearch, setQuerySearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const { api } = useContext(Ctx);

    useEffect(() => {
        api.getPosts()
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.data);
                setIsLoad(true);
            });
    }, [api]);

    return (
        <section className="posts">
            <h2 className="visually-hidden">Посты</h2>
            <div className="posts__wrapper">
                <div className="posts__filter">
                    <input className="posts__filter-input" onChange={(evt) => setQuerySearch(evt.target.value)} type="text" placeholder="Search..." />
                    <div className="posts__filter-tags">
                        <h3 className="posts__filter-tags-title">Tags:</h3>
                        {isLoad ? posts.forEach((post) => {
                            if (post.tags.length > 0) {
                                for (let i = 0; i < post.tags.length; i++) {
                                    if (!postTags.includes(post.tags[i])) {
                                        setPostTags([...postTags, post.tags[i]]);
                                    }
                                }
                            }
                        }) : ''}

                        {isLoad ? postTags.map((tag, index) => {
                            return (
                                <button key={index} onClick={() => {
                                    if (!selectedTags.includes(tag)) {
                                        setSelectedTags([...selectedTags, tag]);
                                    } else {
                                        setSelectedTags(remove(selectedTags, tag));
                                    }
                                }} className={selectedTags.includes(tag) ? "posts__tag-btn posts__tag-btn--active" : "posts__tag-btn"}>{tag}</button>
                            );
                        }) : ''}
                    </div>
                </div>
                <div className="posts__posts">
                    {isLoad ? posts.filter(post => {
                        if (querySearch === "") {
                            return post;
                        } else if (post.title && post.title.toLowerCase().includes(querySearch.toLowerCase())) {
                            return post;
                        }
                        return false;
                    }).filter((post) => {
                        if (selectedTags.length === 0) {
                            return post;
                        } else if (post.tags) {
                            for (let i = 0; i < selectedTags.length; i++) {
                                if (post.tags.includes(selectedTags[i])) {
                                    return post;
                                }
                            }
                        }
                        return false;
                    }).map((post) => {
                        return <Post key={post._id} post={post}></Post>
                    }) : <p>Загрузка...</p>}
                </div>
            </div>
        </section>
    );
};

export default Posts;