import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png'
const Contact = (props) => {
    // console.log("contact card");
    const { id, name, email } = props.location.state.contact;
    return (
        <div className="main">
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">Back</button>
                </Link>
            </div>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
        </div>
    );
}

export { Contact }