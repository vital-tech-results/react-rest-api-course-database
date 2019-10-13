import React, { Component } from 'react';
import './styles/global.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CourseList from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import PrivateRoute from './PrivateRoute';
import withContext from './Context';

// const AuthWithContext = withContext(Authenticated);
const HeaderWithContext = withContext(Header);
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
            <Route exact path="/" component={CourseList} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
      

            <Route path="/courses/:id" component={CourseDetailWithContext} />

            

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


