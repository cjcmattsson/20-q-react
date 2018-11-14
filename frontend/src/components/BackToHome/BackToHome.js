import React, { Component } from 'react';
import { Link } from '@reach/router';
import { BackToHomeContainer } from './style';


class BackToHome extends Component {
  render() {
    return (
      <BackToHomeContainer>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.586 23">
            <g transform="translate(-2.5 -7.3)">
              <path fill={this.props.iconColor} id="Path_60" data-name="Path 60" d="M28.085,18.719,15.293,7.3,2.5,18.719H6.19V30.3h6.571V22.624h5.063V30.3H24.4V18.719Z"/>
            </g>
          </svg>
        </Link>
      </BackToHomeContainer>

    )
  }
 }

export default BackToHome;
