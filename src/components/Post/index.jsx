import React from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import LikeBtn from "../LikeBtn";

const Post = ({ post }) => {

    return (
        <div className="post">
            <img className="post__image" src={post.image !== undefined ? post.image : "./img/post-bc.jpg"} alt={post.title} />
            <div className="post__wrapper">
                <h3 className="post__title">
                    <Link to={`/blog-react/post/${post._id}`}>{post.title}</Link>
                </h3>
                <LikeBtn post={post}/>
            </div>
        </div>
    );
};

export default Post;