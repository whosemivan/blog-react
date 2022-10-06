import React from "react";
import "./style.css";
import { remove } from '../../utils';

const TagCreator = ({ tags, setTags }) => {
    let tag;

    return (
        <div className="tag-creator">
            <div className="tag-creator__wrapper">
                <input onChange={(e) => { tag = e.target.value }} className="form-page__input tag-creator__input" type="text" placeholder="Tags" />
                <button onClick={() => setTags([...tags, tag])} type="button" className="tag-creator__btn">Add</button>
            </div>
            <div className="tag-creator__block">
                {tags.map((el, index) => {
                    return (
                        <div className="tag-creator__tag" key={index}>
                            <span>{el}</span>
                            <button className="tag-creator__tag-btn" onClick={() => setTags(remove(tags, el))}>
                                <svg width="15" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30 3.02143L26.9786 0L15 11.9786L3.02143 0L0 3.02143L11.9786 15L0 26.9786L3.02143 30L15 18.0214L26.9786 30L30 26.9786L18.0214 15L30 3.02143Z" fill="black" />
                                </svg>
                            </button>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default TagCreator;