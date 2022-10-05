import React, { useState, useContext, useEffect } from "react";
import Post from "../Post";
import "./style.css";
import { Ctx } from "../App";

const Posts = () => {
    const [posts, setPosts] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const [postTags, setPostTags] = useState([]);
    const [querySearch, setQuerySearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [isMostPopular, setIsMostPopular] = useState(false);
    const {api} = useContext(Ctx);

    useEffect(() => {
        api.getPosts()
        .then((res) => res.json())
        .then((data) => {
            setPosts(data.data);
            setIsLoad(true);
        });
    }, [])
console.log(posts);
    return (
        <section className="posts">
            <h2 className="visually-hidden">Посты</h2>
            <div className="posts__wrapper">
                <div className="posts__filter">
                    <input className="posts__filter-input" onChange={(evt) => setQuerySearch(evt.target.value)} type="text" placeholder="Search..." />
                    <div className="posts__filter-tags">
                        <h3 className="posts__filter-tags-title">Tags:</h3>
                        {isLoad ? posts.map((post) => {
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
                                <button key={index} onClick={() => setSelectedTags([...selectedTags, tag])} className="posts__tag-btn">{tag}</button>
                            );
                        }) : ''}
                        <button onClick={() => setIsMostPopular(!isMostPopular)} type="button">The most popular posts</button>
                    </div>
                </div>
                <div className="posts__posts">
                    {isLoad ? posts.filter(post => {
                        if (querySearch === "") {
                            return post;
                        } else if (post.title && post.title.toLowerCase().includes(querySearch.toLowerCase())) {
                            return post;
                        }
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
                    }).sort((post1, post2) => {
                        if (!isMostPopular) {
                            return post1;
                        } else {
                            return post2.likes.length - post1.likes.length;
                        }
                    }).map((post) => {
                        return <Post key={post._id} post={post}></Post>
                    }) : <p>Загрузка...</p>}
                </div>
            </div>
        </section>
    );
};

export default Posts;