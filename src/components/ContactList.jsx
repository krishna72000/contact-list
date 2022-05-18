import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { ContactCard } from './ContactCard';
const ContactList = (props) => {

    const inputE1 = useRef("");
    const renderContacts = props.contacts.map((contact) => {
        return (
            <ContactCard key={contact.id} contact={contact} clickHandher={props.getContactId} />
        );
    });
    const getSearchTerm = () => {
        props.searchKeyword(inputE1.current.value);
        // console.log(inputE1.current.value);
    }
    return (
        <div className="main">
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue right" style={{ float: "right" }}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputE1}
                        type="text"
                        // value={props.term}
                        onChange={getSearchTerm}
                        placeholder="search"
                        className="prompt" />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContacts.length > 0 ? renderContacts : "No Contacts Found"}
            </div>
        </div>
    );
}

export { ContactList }