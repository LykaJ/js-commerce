import React, {Component} from 'react';
import {Button, FormGroup} from "react-bootstrap";
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label htmlFor="emailInput">Email address</label>
                        <input type="email" className="form-control" id="emailInput" name="email"
                               value={this.state.email}
                               onChange={this.handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" className="form-control" id="passwordInput" name="password"
                               value={this.state.password}
                               onChange={this.handleChange} required/>
                    </FormGroup>

                    <Button type="submit" className="btn-primary">Login</Button>

                </form>
            </div>
        );
    }

    handleSubmit(event) {
        const {email, password} = this.state;

        axios
            .post(
                "http://localhost:3000/login",
                {
                    email: email,
                    password: password
                },
                {withCredentials: true}
            )
            .then(response => {
                console.log("res from login", response);
                if (response.data.loggedIn) {
                    this.props.handleSuccessfulAuth(response.data);
                }

            })
            .catch(error => {
                console.log("login error", error);
            });
        event.preventDefault();
    }
};