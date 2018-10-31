import React, { Component } from 'react';
import { ButtonLargeContainer } from './style.js';
import { Link } from "@reach/router";

class ButtonLarge extends Component {

  render() {

    return (
      <ButtonLargeContainer>
        <Link to={`/${this.props.redirectTo}`}>
          {this.props.buttonText}
        </Link>
    </ButtonLargeContainer>
    )
  }
}

export default ButtonLarge;
