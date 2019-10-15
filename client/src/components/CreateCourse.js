import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: [],
            courses: [],
            courseTitle: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: ''
        };
    }

    componentDidMount() {
        this.createCourse();
    }

  async  createCourse() {
        // context.data.createCourse(id, emailAddress, password)
        // console.log('ookasdf')
        await fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(data => {
                this.setState({ 'courses': data.course, 'courseTitle': data.course.title });
                console.log(this.state.courseTitle)
            })
            .catch(err => (Error('There seems to be problem ', err)));
    }

    cancel () {
        this.props.history.push('/');
    }

    render() {
        const {
            errors,
            courseTitle,
            description,
            estimatedTime,
            materialsNeeded            
        } = this.state
   
        return (                          
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <div className="validation--errors--label">
                            {errors ? errors.map(error => <li key={error}>{error}</li>) : ''}
                        </div>

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
                                                    id="courseTitle"
                                                    name="courseTitle"
                                                    type="text"
                                                    className="input-title course--title--input"
                                                    value={courseTitle}
                                                    value='oasd'
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











