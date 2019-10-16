import React, { Component } from 'react';
import Form from './Form';


export default class UpdateCourse extends Component {

    constructor(props, context) {
        // const { context } = this.props;
        super(props, context);
        this.state = {
            courses: [],
            errors: [],
            password: null,
            emailAddress: null,
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            id: '',
            userId: null

        };
    }

    componentDidMount() {
        this.isLoggedIn();
    }

    async isLoggedIn() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        if (authUser) {
            await this.setState({ 'emailAddress': authUser.emailAddress, 'password': authUser.password, 'userId': authUser.id, });
        }
        this.getCourseDetails();                  
    }

    getCourseDetails() {
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    courses: data.course,
                    title: data.course.title,
                    description: data.course.description,
                    estimatedTime: data.course.estimatedTime,
                    materialsNeeded: data.course.materialsNeeded,
                    id: data.course.id
                })
            })
            .catch(err => (Error('There seems to be problem ', err)));
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
        const password = context.password;
        const emailAddress = this.state.emailAddress;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            id,
            userId } = this.state;

        const courseJSON = { title, description, estimatedTime, materialsNeeded, userId }

        context.data.updateCourse(courseJSON, id, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                        alert(`NOT UPDATED. SEE ERRORS.`);
                    this.setState({ errors });
                } else {
                        alert(`Course has been updated`);                    
                    this.props.history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });
    }


    cancel = () => {
        this.props.history.push('/');
    }

    render() {

        const {
            errors,
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state

        return (
            <div>

                <hr />
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>

                        <Form
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
                            elements={() => (
                                <div>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <React.Fragment>
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    className="input-title course--title--input"
                                                    placeholder="Course title..."
                                                    value={title}
                                                    onChange={this.change} />
                                            </React.Fragment>

                                            <div className="course--description">
                                                <React.Fragment>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        placeholder="Course description..."
                                                        value={description}
                                                        onChange={this.change} />
                                                </React.Fragment>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="grid-25 grid-right">
                                            <div className="course--stats">
                                                <ul className="course--stats--list">
                                                    <li key="Estimated Time">
                                                        <h4>Estimated Time</h4>
                                                        <div>
                                                            <React.Fragment>
                                                                <input
                                                                    id="estimatedTime"
                                                                    name="estimatedTime"
                                                                    type="text"
                                                                    className="course--time--input"
                                                                    placeholder="Hours"
                                                                    value={estimatedTime}
                                                                    onChange={this.change} />
                                                            </React.Fragment>
                                                        </div>
                                                    </li>
                                                    <li key="Materials">
                                                        <h4>Materials Needed</h4>
                                                        <div>
                                                            <textarea
                                                                id="materialsNeeded"
                                                                name="materialsNeeded"
                                                                placeholder="List materials..."
                                                                value={materialsNeeded}
                                                                onChange={this.change}
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} />

                    </div>
                </div>
            </div>

        );
    };
};

