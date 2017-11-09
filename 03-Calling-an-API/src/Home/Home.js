import React, {Component} from 'react';
import {Button, FormGroup, FormControl, Form} from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verificationCode: ''
        };
        this.sendCode = this.sendCode.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    sendCode(e){
        e.preventDefault();
        console.log('sendCode', this.state.email);
        this.props.auth.sendCode(this.state.email);
    }

    login(e) {
        e.preventDefault();
        console.log(this.state.verificationCode);
        this.props.auth.login(this.state.email, this.state.verificationCode);
    }

    handleChange(event) {
        const newValue = event.target.value;
        const key = event.target.name;
        this.setState(prevState => {
            const newState = {...prevState};
            newState[key] = newValue;
            return newState;
        });
    }

    loginForm() {
        return (
            <div>
                <h4>You are not logged in!</h4>
                <Form onSubmit={this.sendCode}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <Button bsStyle="primary" type="submit">Send code</Button>
                    </FormGroup>
                </Form>
                <hr/>
                <Form onSubmit={this.login}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Enter your code"
                            name="verificationCode"
                            value={this.state.verificationCode}
                            onChange={this.handleChange}
                        />
                        <Button bsStyle="primary" type="submit">Login</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <div className="container">
                {
                    isAuthenticated() && (
                        <h4>
                            You are logged in!
                        </h4>
                    )
                }
                {
                    !isAuthenticated() && this.loginForm()
                }
            </div>
        );
    }
}

export default Home;
