import React, { Component } from 'react';
import Observer from 'react-intersection-observer';
import { GuessContainer } from './style';

class HistoryGuess extends Component {

  render() {

    return (
      <Observer threshold={0.8} rootMargin={"10px 20px 30px 40px"}>
        {({ inView, ref }) => {
          console.log(inView);
          return (
            <GuessContainer style={{...this.props.styleProps}} ref={ref}>
              <div className="historyGuess">
                <div className="guessNr" style={{backgroundColor: this.props.guessInfo.answere ? "#0D86DA" : "#FF7979"}}></div>
                <div className="guessQuestion" style={{color: "black"}}>
                      {this.props.guessInfo.guess}
                </div>
              </div>
            </GuessContainer>
        )}}
      </Observer>

    )
  }
}

export default HistoryGuess;
