import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import config from '../config';
import Form from './Form';

export default class UserSignIn extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         'emailAddress': '',
    //         'firstName': '',
    //         'lastName': '',
    //         'password': '',
    //         'errors': [],
    //     };
    // }
    constructor(props, context) {
        super(props, context);
        // this.signIn = this.signIn.bind(this);
        this.state = {
            emailAddress: '',
            password: '',
            errors: [],
        }
    }


    componentDidMount() {
        // this.getUser();
        // this.signIn('uniquefouroct@smith.com', 'haribol');
    }

    // async getUser() {
    //     await fetch('http://localhost:5000/api/users')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ 'firstName': data.firstName });
    //             console.log(data.firstName);
    //         })
    //         .catch(err => (Error('There seems to be problem ', err)));
    // }

    // api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    //     const url = config.apiBaseUrl + path;

    //     const options = {
    //         method,
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //         },
    //     };

    //     if (body !== null) {
    //         options.body = JSON.stringify(body);
    //     }

    //     if (requiresAuth) {
    //         const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    //         options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    //     }
    //     return fetch(url, options);
    // }


    // async getUser(emailAddress, password) {
    //     const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    //     if (response.status === 200) {
    //         return response.json().then(data => data);
    //     }
    //     else if (response.status === 401) {
    //         return null;
    //     }
    //     else {
    //         throw new Error();
    //     }
    // }

    // async signIn(emailAddress, password) {
    //     const user = await this.getUser(emailAddress, password);
    //     if (user !== null) {
    //         this.setState(() => {
    //             return {
    //                 authenticatedUser: user,
    //             };
    //         });
    //         console.log(user)
    //         // const cookieOptions = {
    //         //     expires: 1 // 1 day
    //         // };
    //         // Cookies.set('authenticatedUser', JSON.stringify(user), { cookieOptions });
    //     }
    //     return user;
    // }



    render() {

        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (

            <div>
             
                <hr />
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign In</h1>
                        <div>                            
                            <Form
                                cancel={this.cancel}
                                errors={errors}
                                submit={this.submit}
                                submitButtonText="Sign In"
                                elements={() => (
                                    <React.Fragment>
                                        <input
                                            id="emailAddress"
                                            name="emailAddress"
                                            type="text"
                                            value={emailAddress}
                                            onChange={this.change}
                                            placeholder="Email Address" />
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={this.change}
                                            placeholder="Password" />
                                    </React.Fragment>
                                )} />

                        </div>
                        <p>&nbsp;</p>
                        <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                    </div>
                </div>
            </div>
        )
    }




    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was NOT successful. Try again.'] };
                    });
                } else {                    
                    this.props.history.push(from);
                }
            })
            .catch((error) => {
                console.error(error);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }



}