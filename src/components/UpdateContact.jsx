import React from 'react'
import { Link } from 'react-router-dom';

class UpdateContact extends React.Component {
    constructor(props) {
        super(props);
        const { id, name, email } = props.location.state.contact;
        this.state = {
            id,
            name,
            email,
        }
    }


    update = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All fields are required");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({
            name: "",
            email: ""
        });
        this.props.history.push("/");
        console.log(this.props);
    }

    render() {
        return (
            <div className="ui main">
                <h2>Update Contact
                    <Link to="/">
                        <button className="ui button blue right" style={{ float: "right" }}>Contact List</button>
                    </Link>
                </h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        );
    }
}
export { UpdateContact }