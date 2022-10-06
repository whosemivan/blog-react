import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import { Ctx } from "../App";

const PersonalArea = () => {
    const { userId, api } = useContext(Ctx);
    const [data, setData] = useState();
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        api.setPersonInfo(userId).then(res => res.json()).then(data => {
            console.log(data.message);
            console.log(data.data);
            setData(data.data);
            setIsLoad(true);
        })
    }, [api, userId]);

    // не понимаю почему этот запрос не срабатывает !

    // useEffect(() => {
    //     api.getPersonInfo(userId).then(res => res.json()).then(data => {
    //         console.log(data.message);
    //         console.log(data);
    //     })
    // }, []);


    return (
        <section className="form-page">
            {isLoad ? <>
                <h1>Your email: {data.email}</h1>
                <h1>Your name: {data.name}</h1>
                <Link className="form-page__link" to="/blog-react/">Home</Link>
                </> : <p>Загрузка...</p>
            }
        </section>
    );
};

export default PersonalArea;