import React, { Component } from 'react';
import { GuessContainer } from './style';

class HistoryGuess extends Component {

  render() {

    return (
            <GuessContainer style={{...this.props.styleProps}}>
              <div className="historyGuess">
                <div className="guessNr" style={{backgroundColor: this.props.guessInfo.answere ? "#0D86DA" : "#FF7979"}}>
                  <p className="number">{this.props.nr}</p>
                  <p className="answere">{this.props.guessInfo.answere ? "Ja" : "Nej"}</p>
                </div>
                <div className="guessQuestion" style={{color: "black"}}>
                      {this.props.guessInfo.guess}
                </div>
              </div>
            </GuessContainer>

    )
  }
}

export default HistoryGuess;
