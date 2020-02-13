import React, { Component } from 'react'
import { Form, Grid, Message, Segment } from 'semantic-ui-react'
import { Button, Card, Row, Col, TextInput } from 'react-materialize'

class LoginRegisterForm extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            username: '',
            action: 'login'
        }
    }

  
    login = async (loginInfo) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(loginInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedLoginResponse = await response.json()

        if (parsedLoginResponse.status.code === 200) {
            this.props.loggedStatus(parsedLoginResponse.data.email)
        } else {
            console.log('Login Failed: ', parsedLoginResponse);
        }
    }

    register = async (registerInfo) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, {
            method: 'POST',
            // This is necessary when sessions have been set up in the back-end
            credentials: 'include',
            body: JSON.stringify(registerInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedRegisterResponse = await response.json();

        if (parsedRegisterResponse.status.code === 200) {
            // We can pass the user's email back up to App.js to distribute to child components
            this.props.loggedStatus(parsedRegisterResponse.data.email)
            // Using React Router, we can redirect users to the /characters route (front-end route, not back-end route)
            this.props.history.push('/characters');
        } else {
            console.log('Register Failed: ', parsedRegisterResponse);
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.loginRegister()
    }

    switchForm = () => {
        if (this.state.action === "login") {
            this.setState({
                action: 'register'
            })
        } else {
            this.setState({
                action: 'login'
            })
        }
    }

    loginRegister = () => {
        if (this.state.action === "login") {
            this.login({
                email: this.state.email,
                password: this.state.password
            })
        } else {
            this.register({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        }
    }

    render() {
        return (
        <div className="LoginRegisterForm">
            { !this.props.loggedIn ?
                <Row
                    textAlign='center'
                    style={{ height: '100vh' }}
                    verticalAlign='middle'
                >
                    <Col
                        style={{ maxWidth: 450 }}
                    >
                        <Form
                            size='large'
                            onSubmit={this.handleSubmit}
                        >
                            <Segment stacked>
                                { this.state.action === "register" ?
                                    <React.Fragment>
                                        <TextInput
                                            fluid icon='user'
                                            iconPosition='left'
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                    </React.Fragment>
                                : null
                                }
                                <TextInput
                                    fluid icon='mail'
                                    iconPosition='left'
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <TextInput
                                    fluid icon='lock'
                                    iconPosition='left'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    fluid size='large'
                                    type="Submit"
                                >
                                    { this.state.action === "register" ? "Register"
                                    : "Log In"}
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            { this.state.action === "register" ?
                                <small>Already have an account?
                                    <span onClick={this.switchForm}>
                                        Click here to log in.
                                    </span>
                                </small>
                                :
                                <small>Need That Shit
                                    <span onClick={this.switchForm}>
                                        Click here to Get That Shit.
                                    </span>
                                </small>
                            }
                        </Message>
                    </Col>
                </Row>
                :
                <div></div>}
            </div>
        )
    }
}

export default LoginRegisterForm