import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';

export default class CourseList extends Component {
    constructor() {
        super();
        this.state = {
            errors: [],
            courseTitle: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: ''
        };
    }
    /*
      componentDidMount() {
          this.postItems();
      }
  
  
      async postItem() {
          await fetch('localhost:5000/api/courses', {
              method: 'post',
              body: data,
          })
              .then(response => response.json())
              .then(data => {
                  this.setState({ 'postCourse': data.course });
                  console.log(data.course)
              });
      }
  */

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }


    cancel = () => {
        this.props.history.push('/');
    }
    render() {

        const {
            errors,
            courseTitle,
            description,
            estimatedTime,
            materialsNeeded,
        } = this.state;

        return (
            <div>
                <hr />
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>Please provide a value for "Title"</li>
                                    <li>Please provide a value for "Description"</li>
                                </ul>
                            </div>
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
                                                    id="username"
                                                    courseTitle="courseTitle"
                                                    type="text"
                                                    className="input-title course--title--input"
                                                    value={courseTitle}
                                                    onChange={this.change}
                                                    placeholder="Course Title" />
                                            </React.Fragment>

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
                                    </div>

                                    {/* right side of form */}
                                    <div>
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
                                                    <li class="course--stats--list--item">
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

                                </div>

                            )} />

                    </div>
                </div>
            </div >

        );
    };
};











