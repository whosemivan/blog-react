import React, { useContext, useState, useEffect } from "react";
import "./style.css";
import { useParams, Link } from 'react-router-dom';
import { Ctx } from "../App";
import browserHistory from "../../browser-history";
import LikeBtn from "../LikeBtn";
import {QRCodeSVG} from 'qrcode.react';

const PostPage = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isPopup, setIsPopup] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [comment, setComment] = useState();
    const [isQr, setIsQr] = useState(false);
    const { userId, api } = useContext(Ctx);

    useEffect(() => {
        api.getPost(id)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setIsLoad(true);
            });
    }, [data, api, id])

    const handle = () => {
        api.deletePost(id)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                browserHistory.push('/blog-react');
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
        <section className="post-page">
            <h1 className="post-page__title">{isLoad && data.title}</h1>
            <div className="post-page__wrapper">
                {
                    isLoad ?
                        <>
                            <img className="post-page__img" src={data.image !== undefined ? data.image : "../img/post-bc.jpg"} alt={data.title} />
                            <LikeBtn post={data} />
                            <div className="post-page__block">
                                {
                                    data.tags.map((el, index) => {
                                        return <div key={index} className="post-page__tag">{el}</div>
                                    })
                                }
                            </div>
                            <form className="post-page__form" onSubmit={handlerComment}>
                                <h2 className="post-page__form-title">Comments</h2>
                                <input className="post-page__input" minLength={10} type="text" onChange={(e) => { setComment(e.target.value) }} placeholder="Your comment" />
                                <button className="post-page__btn" type="submit">Отправить</button>
                            </form>
                            <ul className="post-page__list">
                                {data.comments.map((el, index) => {
                                    return <li className="post-page__item" key={index}>{el}</li>
                                })}
                            </ul>

                            {
                                userId && userId === data.author ?
                                    <div className="post-page__admin-panel">
                                        <Link className="post-page__link-admin" to={`/blog-react/edit-post/${id}`}>Change</Link>
                                        <button className="post-page__link-admin" type="button" onClick={() => setIsPopup(true)}>Delete</button>
                                    </div> : ''
                            }
                        </>

                        : <p>Загрузка...</p>
                }
                {
                    isPopup ?
                        <div className="post-page__modal">
                            <h2 className="post-page__modal-title">Are you sure?</h2>
                            <button className="post-page__modal-btn" onClick={handle}>Yes</button>
                            <button className="post-page__modal-btn" onClick={() => setIsPopup(false)}>No</button>
                        </div> :
                        ""
                }
            <Link className="post-page__link" to="/blog-react">Home</Link>
            <button className="post-page__btn-qr" onClick={() => setIsQr(!isQr)}>{!isQr ? "Generate" : "Close"} QR-code</button>
            {isQr && <QRCodeSVG className="post-page__qr-code" value={`https://whosemivan.github.io/blog-react/post/${id}`} />}
            </div>
        </section>
    );
};

export default PostPage;