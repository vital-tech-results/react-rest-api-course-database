import React, { Component } from 'react';
import {
    Link,
    Redirect,
} from "react-router-dom";

export default class CourseDetail extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            'courses': [],
            'deleted': false,
            'user': ''
        };
    }
    componentWillMount() {
        this.getItems();
    }
    getItems() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'courses': data.course});
            })
            .catch(err => (Error('There seems to be problem ', err)));
    }


    deleteItem() {
        const { location } = this.props;
        console.log(location.pathname);

        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ 'deleted': true });
                console.log('it was removed')
            })
            .catch(err => (Error('There seems to be problem ', err)));

    }


    render() {

        // if deleteItems updates state of 'deleted' then redirect
        const { deleted } = this.state;
        if (deleted) {
            return <Redirect to='/' />;
        }
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div>

                <hr />
                <div>

                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">

                                {authUser ?
                                    <React.Fragment>
                                        <span>
                                            {/* pass params to Link https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router/30115524 */}
                                            <Link to={`/courses/${this.props.match.params.id}/update`} className="button">Update Course</Link>
                                            {/* delete button */}
                                            <Link to="#" onClick={this.deleteItem} className="button">Delete Course
                                    </Link>
                                            <Link to="/" className="button button-secondary">Return to List</Link>
                                        </span>
                                    </React.Fragment>
                                    :

                                    <React.Fragment>
                                        <p>In order to delete or update a course you must me signed in. Looks like you are not signed in. <Link to="/signin">CLICK HERE</Link> to sign in or <Link to="/signup">Click here to sign up!</Link> </p>
                                        <Link to="/" className="button button-secondary">Return to List</Link>
                                    </React.Fragment>
                                }

                            </div>
                        </div>
                    </div>


                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{this.state.courses.title}</h3>
                                {/* <p>{this.state.courses.firstName}</p> */}
                            </div>
                            <div className="course--description">
                                <p>{this.state.courses.description}</p>
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
                                        <p>{this.state.courses.materialsNeeded}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

