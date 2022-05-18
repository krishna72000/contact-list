import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png'
const DeleteContact = (props) => {

    console.log(props);
    const { id, name, email } = props.location.state.contact;
    const deleteContacts = (id) => {
        props.deleteContact(id);
        props.history.push("/");
    };
    return (
        <div className="ui main">
            <div className="ui card centered grid" style={{ padding: "30px 20px", width: "500px" }}>
                <p>Are you sure you want to delete contact of <b>{name}</b>?</p>
                <div>
                    <button onClick={() => deleteContacts(id)} className="ui button red">Delete</button>
                    <Link to="/">
                        <button className="ui button default">Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { DeleteContact }