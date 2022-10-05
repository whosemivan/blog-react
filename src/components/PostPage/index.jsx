import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";
import LikeBtn from "../LikeBtn";

const PostPage = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isPopup, setIsPopup] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [comment, setComment] = useState();
    const { userId, api, isAuth } = useContext(Ctx);

    useEffect(() => {
        api.getPost(id)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setIsLoad(true);
            });
    }, [data])

    const handle = () => {
        api.deletePost(id)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                browserHistory.push('/');
            })
    };

    const handlerComment = (evt) => {
        evt.preventDefault();

        api.updatePost(id, { comments: [...data.comments, comment] }).then(res => res.json()).then(data => {
            if (data.message === "ok") {
                console.log('Success!');
            }
        })
    };

    return (
        <section>
            {
                isLoad ?
                    <>
                        <h1>{data.title}</h1>
                        <img src={data.image !== undefined ? data.image : "../img/post-bc.jpg"} alt={data.title} />
                        <LikeBtn post={data}/>
                        <form onSubmit={handlerComment}>
                            <input minLength={10} type="text" onChange={(e) => { setComment(e.target.value) }} />
                            <button type="submit">Отправить</button>
                        </form>

                        {data.comments.map((el) => {
                            return <p>{el}</p>
                        })}

                        {
                            data.tags.map((el) => {
                                return <p>{el}</p>
                            })
                        }
                        
                        {
                            userId && userId === data.author ?
                                <>
                                    <Link to={`/edit-post/${id}`}>Change</Link>
                                    <button type="button" onClick={() => setIsPopup(true)}>Delete</button>
                                </> : ''
                        }
                    </>

                    : <p>Загрузка...</p>
            }
            {
                isPopup ?
                    <div>
                        <h2>Are you sure?</h2>
                        <button onClick={handle}>Yes</button>
                        <button onClick={() => setIsPopup(false)}>No</button>
                    </div> :
                    ""
            }

        </section>
    );
};

export default PostPage;