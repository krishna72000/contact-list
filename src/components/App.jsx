import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { uuid } from 'uuidv4'
import { Header } from './Header'
import { Navbar } from './Navbar/Navbar'
import { AddContact } from './AddContact';
import { UpdateContact } from './UpdateContact';
import { ContactList } from './ContactList';
import { Contact } from "./Contact";
import { DeleteContact } from "./Delete";
import { Features, Pricing, Testimonials, TryFree } from "./pages/index";
import Loading from './Loading'
import { api } from "../api/contacts"
import './App.css';


function App() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const getContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    };
    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newContactList = contacts.filter((contact) => {
                return Object.values(contact)
                    .join(" ")
                    .toLocaleLowerCase()
                    .includes(searchTerm.toLocaleLowerCase());
            });
            setSearchResult(newContactList);
        }
    }
    const addContactHandler = async (contact) => {
        const request = {
            id: uuid(),
            ...contact
        }
        const response = await api.post("/contacts", request);
        setContacts([...contacts, response.data]);
    }
    const updateContact = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        console.log(response);
        const { id, name, email } = response.data;
        setContacts(contacts.map((contact) => {
            return contact.id === id ? { ...response.data } : contact;
        }));
    }
    const removeContact = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) => {
            return contact.id != id;
        });
        setContacts(newContactList);
    }
    useEffect(() => {
        console.log("app effect get");
        const getAllContacts = async () => {
            const allContacts = await getContacts();
            if (allContacts) {
                setContacts(allContacts);
            }
        }
        getAllContacts();
    }, []);

    return (
        <div className="ui container">
            <Router>
                <Navbar />
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/add" render={(props) => (
                            <AddContact {...props} addContactHandler={addContactHandler} />
                        )} />
                        <Route exact path="/" render={(props) => (
                            <ContactList
                                {...props}
                                contacts={searchTerm.length > 0 ? searchResult : contacts}
                                term={searchTerm}
                                searchKeyword={searchHandler}
                            />
                        )} />
                        <Route exact path="/contact/:id" render={(props) => (
                            <Contact {...props} />
                        )} />
                        <Route exact path="/edit/:id" render={(props) => (
                            <UpdateContact {...props} updateContactHandler={updateContact} />
                        )} />
                        <Route exact path="/delete/:id" render={(props) => (
                            <DeleteContact {...props} deleteContact={removeContact} />
                        )} />
                        <Route path="/features" component={Features} />
                        <Route path="/testimonials" component={Testimonials} />
                        <Route path="/pricing" component={Pricing} />
                        <Route path="/tryfree" component={TryFree} />
                    </Switch>
                </Suspense>
            </Router>

        </div>
    );
}

export { App };