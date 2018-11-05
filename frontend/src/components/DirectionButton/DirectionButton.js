import React, { Component } from 'react';
import { DirectionButtonContainer } from './style';

class DirectionButton extends Component {
  render() {
    return (
      <DirectionButtonContainer>
        {this.props.arrowLeft && <img src={require('./arrow.svg')} alt=""/>}
        <p>{this.props.text}</p>
        {this.props.arrowRight && <img src={require('./arrowright.svg')} alt=""/>}
      </DirectionButtonContainer>
    )
  }
}

export default DirectionButton;
