import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from "react-router-dom";
// const ReactMarkdown = require('react-markdown');
const ReactMarkdown = require('react-markdown/with-html');

export default class CourseDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.deleteItem = this.deleteItem.bind(this);
        this.update = this.update.bind(this);
        this.ifAuth = this.ifAuth.bind(this);
        this.state = {
            'courses': [],
            'deleted': false,            
            'User': [],
            'emailAddress': null,
            'password': null,
            'isLoggedIn': false
        };
    }
    componentDidMount() {
        this.getItems();
    }
 async  getItems() {
      await  fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'courses': data.course, 'User': data.course.User });
                const { context } = this.props;
                const authUser = context.authenticatedUser;
                if (authUser) {
                    this.setState({ 'emailAddress': authUser.emailAddress, 'password': authUser.password })
                }
                this.ifAuth();
            })
            .catch(err => (Error('There seems to be problem ', err)));
    
    }

    deleteItem() {
        const { context } = this.props;
        const id = this.props.match.params.id;
        const emailAddress = this.state.emailAddress;
        const password = context.password;

        context.data.deleteCourse(id, emailAddress, password)
            .then(() => {
                alert(`Course ${this.state.courses.id} has been deleted`);
            })
            .then(() => {
                this.props.history.push('/');
            });
    }

    update() {
        this.props.history.push(`/courses/${this.props.match.params.id}/update`);        
    }
    ifAuth() {        
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        if (authUser) {
            if (authUser.emailAddress === this.state.User.emailAddress) {
                this.setState({ 'isLoggedIn': true });
            } 
        } else {
            this.setState({ 'isLoggedIn': false });
        }
    }

    render() {
        // if deleteItems updates state of 'deleted' then redirect
        const { deleted } = this.state;
        const { isLoggedIn } = this.state;
        if (deleted) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {isLoggedIn ?
                                <React.Fragment>
                                    <span>
                                        {/* pass params to Link https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router/30115524 */}
                                        <Link to="#" onClick={this.update} className="button">Update Course</Link>                                        
                                        {/* delete button */}
                                        <Link to="#" onClick={this.deleteItem} className="button">Delete Course
                                    </Link>
                                        <Link to="/" className="button button-secondary">Return to List</Link>
                                    </span>
                                </React.Fragment>
                                :

                                <React.Fragment>
                                    <Link to="/" className="button button-secondary">Return to List</Link>
                                </React.Fragment>
                            }

                        </div>
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course id: {this.state.courses.id}</h4>
                            <h3 className="course--title">{this.state.courses.title}</h3>
                            {/* insert author of course */}
                            <p>By: {this.state.User.firstName} {this.state.User.lastName}</p>
                        </div>
                        <div className="course--description">

                            <ReactMarkdown
                                source={this.state.courses.description}
                                escapeHtml={false}
                            />

                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.courses.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown
                                        source={this.state.courses.materialsNeeded}
                                        escapeHtml={false}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

