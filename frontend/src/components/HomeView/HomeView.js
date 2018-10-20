import React, { Component } from 'react';

import { Link } from "@reach/router";

class HomeView extends Component {



  render() {
    return (
      <div className="startPageView">
        <h1>Startsida</h1>
        <Link to="/createGameView">Create Game!</Link><br/>
        <Link to="/profileView">Profile</Link><br/>
        <Link to="/publicGamesView">Find games!</Link><br/>
      </div>
    )
  }
}

export default HomeView;
