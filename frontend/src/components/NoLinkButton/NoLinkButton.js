import React, { Component } from 'react';
import { NoLinkButtonContainer } from './style';

class NoLinkButton extends Component {
  render() {
    return (
      <NoLinkButtonContainer
        color={this.props.color}
        type={this.props.type}
        onClick={this.props.function}
      >
        {this.props.text}
      </NoLinkButtonContainer>
    )
  }
}

export default NoLinkButton;
