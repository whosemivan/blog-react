import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import LikeBtn from "../LikeBtn";
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
    }, []);

    // не понимаю почему этот запрос не срабатывает !

    // useEffect(() => {
    //     api.getPersonInfo(userId).then(res => res.json()).then(data => {
    //         console.log(data.message);
    //         console.log(data);
    //     })
    // }, []);


    return (
        <section>
            {isLoad ? <>
                <h1>Yout email: {data.email}</h1>
                <h1>Yout name: {data.name}</h1>
                </> : ""
            }
        </section>
    );
};

export default PersonalArea;