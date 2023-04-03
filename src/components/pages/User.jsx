import React from 'react';
import { Link } from 'react-router-dom';

const User = (props) => {
    const { name, email, id } = props.data;

    return (
        <Link className="flex text-2xl font-bold text-black border-2 border-orange-400 gap-6 m-10 flex-col justify-center items-center p-5" to={`/user-details/${id}`}>
            <h1>{name}</h1>
            <h4>{email}</h4>
        </Link>
    );
};

export default User;
