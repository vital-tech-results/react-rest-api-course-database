import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import withContext from './Context';
import './styles/global.css';

// import components
import Header from './components/Header';
import CourseList from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';


// assign components value of context
const HeaderWithContext = withContext(Header);
const CourseListWithContext = withContext(CourseList);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default class App extends Component {

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <HeaderWithContext />
          <Switch>
            {/* private routes must be above other routes */}
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            
            <Route exact path="/" component={CourseListWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
           
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}


