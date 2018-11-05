import React, { Component } from 'react';
import { Link } from '@reach/router';
import { BackToHomeContainer } from './style';


class BackToHome extends Component {
  render() {
    return (
      <BackToHomeContainer>
        <Link to="/">
          <img src={require('./home.svg')} alt=""/>
        </Link>
      </BackToHomeContainer>

    )
  }
 }

export default BackToHome;
