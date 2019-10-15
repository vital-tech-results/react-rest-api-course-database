import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import config from '../config';
import Form from './Form';

export default class UserSignIn extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            emailAddress: '',
            password: '',
            errors: [],
        }
    }

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
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/');
    }



}