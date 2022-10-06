import React from "react";
import "./style.css";
import {remove} from '../../utils';

const TagCreator = ({tags, setTags}) => {
    let tag;

    return (
        <div>
            <input onChange={(e) => { tag = e.target.value }} className="signin__input" type="text" placeholder="Tags" />
            <button onClick={() => setTags([...tags, tag])} type="button">Добавить</button>
            {tags.map((el, index) => {
                return (
                    <div key={index}>
                        {el}
                        <button onClick={() => setTags(remove(tags, el))}>удалить</button>
                    </div>
                )
            })}
        </div>
    );
};

export default TagCreator;