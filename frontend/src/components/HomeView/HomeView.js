import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import { Link } from "@reach/router";

class HomeView extends Component {

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="startPageView">
        <h1>Startsida</h1>
        <Link to="/createGameView">Create Game!</Link>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export default HomeView;
