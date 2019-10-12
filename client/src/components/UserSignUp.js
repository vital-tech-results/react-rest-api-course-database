import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

export default class UserSignUp extends Component {


    constructor(props) {
        super(props);
        this.state = {
            'courses': [],
            'deleted': false
        };
    }
    componentDidMount() {
        // this.getItems();
    }


    render() {

        return (
            <div>
           
                <hr />
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign Up</h1>
                        <div>
                            <form>
                                <div>
                                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value="" />
                                </div>
                                <div>
                                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value="" />

                                </div>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" />
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" value="" />
                                </div>

                                <div>
                                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"
                                        value="" />
                                </div>
                                
                                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account?
                        
                            <Link to="/signin" className="signin">Sign In</Link>

                            
                            to sign in!</p>
                    </div>
                </div>
            </div>
        )
    }
}

