import React from "react";
import "./style.css";

const Post = ({post}) => {
    
    return (
        <div className="post">
           <img className="post__image" src={post.image !== undefined ? post.image : "img/post-bc.jpg"} alt={post.title}/>
           <h3 className="post__title">{post.title}</h3>
        </div>
    );
};

export default Post;