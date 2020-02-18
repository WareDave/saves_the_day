import React, { Component } from 'react'
import { Form, Button, Grid, Message, Segment, Label, Dropdown, Icon} from 'semantic-ui-react'


const options = [
    { key: '@gmail.com', text: '@gmail.com', value: '@gmail.com' },
    { key: '@outlook.com', text: '@outlook.com', value: '@outlook.com' },
    { key: '@hotmail.com', text: '@hotmail.com', value: '@hotmail.com' },
  ]

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
    loginInfo.username = "temp user"  
    try {       
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(loginInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedLoginResponse = await response.json()

        if(parsedLoginResponse.status.code === 200) {
            this.props.loggedStatus(parsedLoginResponse.data.email)
            this.props.history.push('/characters')
        } else {
            console.log('Login Failed: ', parsedLoginResponse)
        }
    }
    catch{ 
        console.log(this.state.username)
    }
} 

    register = async (registerInfo) => {
   
try {        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(registerInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    
        const parsedRegisterResponse = await response.json()
    
        if (parsedRegisterResponse.status.code === 200) {
            this.props.loggedStatus(parsedRegisterResponse.data.email)
            this.props.history.push('/characters')
        } else {
            console.log('Register Failed: ', parsedRegisterResponse)
        }
    
}
catch {
    console.log(this.username)
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
                <Grid
                    textAlign='center'
                    style={{ height: '100vh' }}
                    verticalAlign='middle'
                >
                    <Grid.Column
                        style={{ maxWidth: 450 }}
                    >
                        <Form
                            size='large'
                            onSubmit={this.handleSubmit}
                        >
                            <Segment stacked>
                                { this.state.action === "register" ?
                                    <React.Fragment>
                                        <Form.Input
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
                             <Label>
                                <Icon name='hand point down' /> Valid Email 
                            </Label>   
                                <Form.Input
                                    fluid icon='mail'
                                    iconPosition='left'
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    label={<Dropdown defaultValue='@gmail.com' options={options} />}
                                    value={this.state.email}
                                    onChange={this.handleChange}

                                />
                             
                                <Form.Input
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
                                    color="pink"
                                >
                                    { this.state.action === "register" ? "Register"
                                    : "Log In"}
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            { this.state.action === "register" ?
                                <small>Got That Shit?
                                    <span onClick={this.switchForm}>
                                        Make It So
                                    </span>
                                </small>
                                :
                                <small>Need That Shit?
                                    <span onClick={this.switchForm}>
                                    Sign Up Here
                                    </span>
                                </small>
                            }
                        </Message>
                    </Grid.Column>
                </Grid>
                :
                <div></div>}
            </div>
        )
    }
}

export default LoginRegisterForm