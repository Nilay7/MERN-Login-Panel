import React, { useState } from "react";
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(resp => JSON.stringify({token: resp.data}))
    .catch(err => err);
}

export default function Login({ setToken }) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    };

    return (
        <div className="login-wrapper">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div className="submitbtn">
                <button type="submit">Login</button>
            </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}