import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    useParams
} from "react-router-dom";
import PropTypes from "prop-types";

export default class CourseDetail extends Component {


    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            'courses': [],
            'deleted': false
        };
    }
    componentDidMount() {
        this.getItems();
    }
    getItems() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'courses': data.course });

            })
            .catch(err => (Error('There seems to be problem ', err)));
    }


    deleteItem() {
        const { match, location, history } = this.props;
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


        return (
            <div>
                {/* <div>You are now at {location.pathname}</div> */}
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
                    </div>
                </div>
                <hr />
                <div>

                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                <span>

                                    {/* pass params to Link https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router/30115524 */}
                                    <Link to={`/courses/${this.props.match.params.id}/update`} className="button">Update Course</Link>

                                    {/* delete button */}
                                    <Link to="#" onClick={this.deleteItem} className="button">Delete Course
                                    </Link>

                                </span>

                                <a className="button button-secondary" href="index.html">Return to List</a>

                            </div>
                        </div>
                    </div>


                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{this.state.courses.title}</h3>
                                <p>{this.state.courses.username}</p>
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

