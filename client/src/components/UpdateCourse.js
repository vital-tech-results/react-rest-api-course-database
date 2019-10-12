import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class UpdateCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
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


    /*
     
      async putItem() {
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

    render() {
        return (
            <div>
                <div className="header">
                    <div className="bounds">
                        <h1 className="header--logo">Courses</h1>
                        <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
                    </div>
                </div>
                <hr />
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                    <div>
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                            value={this.state.courses.title} />
                                    </div>
                                    <p>By Joe Smith</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.courses.description}></textarea>

                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                                    placeholder="Hours" value={this.state.courses.estimatedTime} />

                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.courses.materialsNeeded}></textarea></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
                        </form>
                    </div>
                </div>
            </div>

        );
    };
};