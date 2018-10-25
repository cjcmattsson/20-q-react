import React, { Component } from 'react';
import './HistoryGuess.css';

class HistoryGuess extends Component {

  state = {
    guessWidth: this.props.offsetTop,
  }

  showOffset = (e) => {
    console.dir(e.target);
  }

  render() {
    return (
      <div
        style={{...this.props.styleProps, width: `${this.state.guessWidth}px`}}
        className="historyGuess"
        onClick={(e) => this.showOffset(e)}>
          <p style={{color: "white"}}>
          {this.props.content}
          </p>
      </div>
    )
  }
}

export default HistoryGuess;
