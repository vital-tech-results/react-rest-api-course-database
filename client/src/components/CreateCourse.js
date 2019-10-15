import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            password: null,
            emailAddress: null,
            title: '',
            description: '',
            estimatedTime: '',
            "materialsNeeded": '',
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
            await this.setState({ 'emailAddress': authUser.emailAddress, 'password': authUser.password, 'userId': authUser.id });
        }
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
            userId } = this.state;

        const courseJSON = { title, description, estimatedTime, materialsNeeded, userId }

        const { from } = this.props.location.state || { from: { pathname: '/' } };

        context.data.createCourse(courseJSON, emailAddress, password)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    alert(`Course has been created`);
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
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
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
                                                value={title}
                                                onChange={this.change}
                                                placeholder="Course Title" />
                                        </React.Fragment>
                                    </div>
                                    {/* course description */}
                                    <div className="course--description">
                                        <React.Fragment>
                                            <textarea
                                                id="description"
                                                name="description"
                                                type="text"
                                                value={description}
                                                onChange={this.change}
                                                placeholder="Course description..." />
                                        </React.Fragment>
                                    </div>
                                </div>

                                {/* right side of form */}
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <React.Fragment>
                                                        <input
                                                            id="estimatedTime"
                                                            name="estimatedTime"
                                                            type="text"
                                                            className="course--time--input"
                                                            value={estimatedTime}
                                                            onChange={this.change}
                                                            placeholder="Hours" />
                                                    </React.Fragment>
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <React.Fragment>
                                                        <textarea
                                                            id="materialsNeeded"
                                                            name="materialsNeeded"
                                                            value={materialsNeeded}
                                                            onChange={this.change}
                                                            placeholder="List materials..." />
                                                    </React.Fragment>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )} />
                </div>
            </div>
        );
    };
};











