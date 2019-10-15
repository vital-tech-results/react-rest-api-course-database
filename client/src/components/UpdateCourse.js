import React, { Component } from 'react';
import Form from './Form';


export default class UpdateCourse extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            courseTitle: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            id: '',
            'courses': [],
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

    render() {
        const {
            errors
        //     courseTitle,
        //     description,
        //     estimatedTime,
        //     materialsNeeded,
        } = this.state;

        // const { context } = this.props;
        // const authUser = context.authenticatedUser;

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
                                                <input id="courseTitle"
                                                    name="courseTitle"
                                                    type="text"
                                                    className="input-title course--title--input"
                                                    placeholder="Course title..."
                                                    defaultValue={this.state.courses.title}
                                                    onChange={this.change} />
                                            </React.Fragment>

                                            <div className="course--description">
                                                <React.Fragment>
                                                    <textarea id="description"
                                                        name="description"
                                                        type="text"
                                                        placeholder="Course description..."
                                                        defaultValue={this.state.courses.description}
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
                                                                    defaultValue={this.state.courses.estimatedTime || ""}
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
                                                                defaultValue={this.state.courses.materialsNeeded}
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


    change = (event) => {
        // const name = event.target.name;
        // const value = event.target.value;

        // this.setState(() => {
        //     return {
        //         [name]: value
        //     };
        // });
    }

    submit = () => {
        // const { context } = this.props;
        // const {
        //     errors,
        //     courseTitle,
        //     description,
        //     estimatedTime,
        //     materialsNeeded,
        //     id
        // } = this.state;

        // // Create user
        // const user = {
        //     errors,
        //     courseTitle,
        //     description,
        //     estimatedTime,
        //     materialsNeeded,
        //     id
        // };

        // context.data.updateCourse(this.state.course)
        //     .then(errors => {
        //         if (errors.length) {
        //             this.setState({ errors });
        //         } else {
        //             this.props.history.push('/signin');

        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         this.props.history.push('/error');
        //     });
    }

    cancel = () => {
        // this.props.history.push('/');
    }


};

