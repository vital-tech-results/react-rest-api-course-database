import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class CourseList extends Component {
    /** https://reactjs.org/docs/react-component.html#constructor
     * ? constructor is called because we are binding methods and we are initializing state
     * ? super is used to avoid bugs      
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            'courses': []
        };
    }

    /** as soon as this component mounts execute the 'getItems' method */
    componentDidMount() {
        this.getItems();
    }

    /**fetches courses from the api */
    async getItems() {
        await fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(data => {
                this.setState({ 'courses': data.course })
            })
            .catch(err => (Error('There seems to be problem ', err)));
    }

    render() {
        return (
            <div className="bounds">
                {/* maps over the items that are now in `courses` state */}
                {this.state.courses.map((course, index) => {                    
                    return (                        
                        <div key={course.id} className="grid-33">                                 
                            <a className="course--module course--link" href={`http://localhost:3000/courses/${course.id}`}>
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                            </a>
                        </div>
                    )
                })}

                {/* Button to create new course */}
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </Link>
                </div>
            </div>
        );
    };
};











