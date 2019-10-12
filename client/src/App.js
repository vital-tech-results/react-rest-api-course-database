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
            {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}

            <Route exact path="/" component={CourseList} />
            <Route path="/courses/create" component={CreateCourse} />

            <Route exact path="/courses/:id" render={props => <CourseDetail {...props} id={this.path} />} />
            <Route exact path="/courses/:id/update" render={props => <UpdateCourse {...props} id={this.path} />} />

            {/* <Route path="/signin" component={UserSignIn} /> */}
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











// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

// import Header from './components/Header';
// import Public from './components/Public';
// import NotFound from './components/NotFound';
// import UserSignUp from './components/UserSignUp';
// import UserSignIn from './components/UserSignIn';
// import UserSignOut from './components/UserSignOut';
// import Authenticated from './components/Authenticated';

// import withContext from './Context';
// import PrivateRoute from './PrivateRoute';

// const HeaderWithContext = withContext(Header);
// const AuthWithContext = withContext(Authenticated);
// const UserSignUpWithContext = withContext(UserSignUp);
// const UserSignInWithContext = withContext(UserSignIn);
// const UserSignOutWithContext = withContext(UserSignOut);

// export default () => (
//   <Router>
//     <div>
//       <HeaderWithContext />

//       <Switch>
//         <Route exact path="/" component={Public} />
//         <PrivateRoute path="/authenticated" component={AuthWithContext} />
//         <Route path="/signin" component={UserSignInWithContext} />
//         <Route path="/signup" component={UserSignUpWithContext} />
//         <Route path="/signout" component={UserSignOutWithContext} />
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   </Router>
// );

