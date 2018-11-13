import React, { Component } from 'react';
import { Link } from '@reach/router';
import { BackToHomeContainer } from './style';


class BackToHome extends Component {
  render() {
    return (
      <BackToHomeContainer>
        <Link to="/">
          <img src={this.props.white ? require('./homeWhite.svg') : require('./home.svg')} alt=""/>
        </Link>
      </BackToHomeContainer>

    )
  }
 }

export default BackToHome;
