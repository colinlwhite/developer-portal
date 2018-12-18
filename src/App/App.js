import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import './App.css';
import authRequests from '../helpers/data/authRequests';
import Bio from '../components/Bio/Bio';
import Add from '../components/Add/Add';
import Listings from '../components/Listings/Listings';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
        <div className="row">
       <Auth isAuthenticated={this.isAuthenticated}/>
       </div>
        </div>
      );
    }


    return (
      <div className="App">
      <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
      <div className="row">
      <Bio />
      </div>
      <div className="row">
       <Add />
       <Listings />
       </div>
      </div>
    );
  }
}

export default App;