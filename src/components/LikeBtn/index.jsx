import React, { useContext } from "react";
import { Ctx } from "../App";
import { remove } from "../../utils.js";


const LikeBtn = ({post}) => {
    const { userId, api, isAuth } = useContext(Ctx);
    
    const handler = () => {
        if (isAuth) {
            if (!post.likes.includes(userId)) {
                api.updatePost(post._id, { likes: [...post.likes, userId] }).then(res => res.json()).then(data => {
                    if (data.message === "ok") {
                        console.log("Success");
                    }
                })
            } else {
                api.updatePost(post._id, { likes: remove(post.likes, userId) }).then(res => res.json()).then(data => {
                    if (data.message === "ok") {
                        console.log("Success del");
                    }
                })
            }
        }
    };

    return (
        <button onClick={handler} type="button" className="post__btn-like">
            <span>{post.likes.length}</span>
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.84999 12.0755C3.22381 15.558 7.36027 20.3955 10.7085 23.1821C15.4539 19.1031 19.1682 9.53008 20.1642 7.49738C21.1601 5.46467 21.1204 0.846125 17.4716 0.276997C14.5525 -0.178305 11.8345 3.49221 10.8404 5.38437C8.97405 3.68188 4.61388 0.410107 2.1036 0.942947C-1.03425 1.609 0.119177 7.68797 1.84999 12.0755Z" fill="#7F0B0C" />
            </svg>
        </button>
    );
};

export default LikeBtn;