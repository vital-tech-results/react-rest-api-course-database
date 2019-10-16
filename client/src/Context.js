import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    password: Cookies.getJSON('password') || null,
    id: null,

    // courses: '',
    // title: Cookies.getJSON('title') || null,
    // description: '',
    // estimatedTime: '',
    // materialsNeeded: '',
    // courseId: ''

  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const { password } = this.state;
    // const { title } = this.state;
    const value = {
      authenticatedUser,
      password,
      // title,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }


  // getCourseDetails = async () => {
  //   await fetch(`http://localhost:5000/api/courses/29`)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState(() => {
  //         return {
  //           courses: data.course,
  //           title: data.course.title,
  //           description: data.course.description,
  //           estimatedTime: data.course.estimatedTime,
  //           materialsNeeded: data.course.materialsNeeded,
  //           courseId: data.course.id
  //         };
  //       });
  //       Cookies.set('title', JSON.stringify(data.course.title), { expires: 1 });
  //     })
  //     .catch(err => (Error('There seems to be problem ', err)));

  //   return this.data;
  // }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password)

    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          password: password,
          id: user.id,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      Cookies.set('password', JSON.stringify(password), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    this.setState({ password: null });
    Cookies.remove('authenticatedUser');
    Cookies.remove('password');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

