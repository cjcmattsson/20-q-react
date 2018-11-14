import React, { Component } from 'react';
import { DirectionButtonContainer } from './style';

class DirectionButton extends Component {
  render() {
    return (
      <DirectionButtonContainer onClick={this.props.swipe}>
        {this.props.arrowLeft &&
          <svg viewBox="0 0 17.442 11.428" xmlns="http://www.w3.org/2000/svg">
            <path fill={this.props.arrowColor} d="m15.094-12.363-1.246 1.246 3.474 3.474-13.968-.024v2.013l13.968.024-3.474 3.45 1.246 1.246 5.7-5.7z" transform="matrix(-1 0 0 -1 20.796 -.934)"/>
          </svg>
        }
        <p style={{color: this.props.textColor}}>{this.props.text}</p>
        {this.props.arrowRight &&
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.441 11.428">
            <path fill={this.props.arrowColor} data-name="Path 27" d="M15.094-12.363l-1.246,1.246,3.474,3.474L3.354-7.667v2.013l13.968.024L13.848-2.18,15.094-.934l5.7-5.7Z" transform="translate(-3.354 12.363)"/>
          </svg>
        }
      </DirectionButtonContainer>
    )
  }
}

export default DirectionButton;
