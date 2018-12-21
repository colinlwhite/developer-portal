import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import materialsRequest from '../helpers/data/materialsRequest';
import './App.css';
import authRequests from '../helpers/data/authRequests';
import Bio from '../components/Bio/Bio';
import Add from '../components/Add/Add';
import Listings from '../components/Listings/Listings';

class App extends Component {
  state = {
    authed: false,
    materials: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    connection();
    materialsRequest.getRequest()
      .then((materials) => {
        this.setState({ materials });
      })
      .catch(err => console.error('error with materials', err));

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

  deleteOne = (materialId) => {
    materialsRequest.deleteResource(materialId)
      .then(() => {
        materialsRequest.getRequest()
          .then((materials) => {
            this.setState({ materials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitEvent = (newMaterial) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      materialsRequest.putRequest(editId, newMaterial)
        .then(() => {
          materialsRequest.getRequest()
            . then((materials) => {
              this.setState({ materials, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    } else {
      materialsRequest.postRequest(newMaterial)
        .then(() => {
          materialsRequest.getRequest()
            .then((materials) => {
              this.setState({ materials });
            });
        })
        .catch(err => console.error('error with listings post', err));
    }
  }

  passResourceToEdit = materialId => this.setState({ isEditing: true, editId: materialId });

  render() {
    const {
      authed,
      materials,
      isEditing,
      editId,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!authed) {
      return (
        <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
        <div className="row">
       <Auth isAuthenticated={this.isAuthenticated}/>
       </div>
        </div>
      );
    }


    return (
      <div className="App">
      <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
      <div className="row">
      <Bio />
      </div>
      <div className="row">
       <Add onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId} />
       <Listings
       materials={materials}
       deleteSingleResource={this.deleteOne}
       passResourceToEdit={this.passResourceToEdit}
       />
       </div>
      </div>
    );
  }
}

export default App;
