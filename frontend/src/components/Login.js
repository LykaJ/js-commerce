import React, {Component} from 'react';
import {Button, FormGroup} from "react-bootstrap";
import App from "../App";

const API = 'http://localhost:3000/api/';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        fetch(API).then(response => {
            console.log(response.headers)
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <FormGroup>
                    <label htmlFor="emailInput">Email address</label>
                    <input type="email" className="form-control" id="emailInput"
                           placeholder="name@example.com"
                           onChange={(event, newValue) => this.setState({email: newValue})}/>

                    <label htmlFor="passwordInput">Email address</label>
                    <input type="password" className="form-control" id="passwordInput"
                           onChange={(event, newValue) => this.setState({password: newValue})}/>

                    {/*<Button label="Submit" primary={true} onClick={(event) => this.handleClick(event)}></Button>*/}
                </FormGroup>
            </div>
        );
    }
};

export default Login;