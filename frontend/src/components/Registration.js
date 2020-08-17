import React, {Component} from "react";
import axios from "axios";
import {Button, FormGroup} from "react-bootstrap";

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const {email, password, password_confirmation} = this.state;

        axios
            .post(
                "http://localhost:3001/signup",
                {
                    user: {
                        email: email,
                        password: password,
                        password_confirmation: password_confirmation
                    }
                },
                {withCredentials: true}
            )
            .then(response => {
                if (response.data.status === "created") {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log("registration error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <h2>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label htmlFor="emailInput">Email address</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="emailInput"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />

                        <label htmlFor="passwordInput">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            id="passwordInput"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </FormGroup>
                    <Button label="Submit" type="submit" className="btn-primary">Register</Button>
                </form>
            </div>
        );
    }
}