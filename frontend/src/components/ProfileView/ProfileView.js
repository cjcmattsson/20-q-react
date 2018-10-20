import React, { Component } from 'react';
import { Link } from "@reach/router";
import firebase from '../../utils/firebase';
import './ProfileView.css';

class ProfileView extends Component {

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="profileView">
          <h1> Hello {this.props.user.displayName} </h1>
          <Link onClick={this.logout} to="/">Logout</Link>
      </div>
    )
  }
}

export default ProfileView;
