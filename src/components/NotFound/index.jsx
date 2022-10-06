import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="form-page">
            <h1>404</h1>
            <Link className="form-page__link" to="/blog-react/">Home</Link>
        </div>
    );
};

export default NotFound;