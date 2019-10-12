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

import PrivateRoute from './PrivateRoute';
import withContext from './Context';

// const AuthWithContext = withContext(Authenticated);
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default class App extends Component {

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App">
          <HeaderWithContext />
          <Switch>
            {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}

            <Route exact path="/" component={CourseList} />
            <Route path="/courses/create" component={CreateCourse} />

            <Route exact path="/courses/:id" render={props => <CourseDetail {...props} id={this.path} />} />
            <Route exact path="/courses/:id/update" render={props => <UpdateCourse {...props} id={this.path} />} />

            {/* <Route path="/signin" component={UserSignIn} /> */}
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/signout" component={UserSignOutWithContext} />

          </Switch>


        </div>
      </BrowserRouter>
    );
  }

}

