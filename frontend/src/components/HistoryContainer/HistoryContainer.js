import React, { Component } from 'react';
import HistoryGuess from '../HistoryGuess/HistoryGuess';
import { GuessListContainer } from './style';


class HistoryContainer extends Component {

  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  render() {
    const {guesses} = this.props;
    let z = 0;
    return (
      <GuessListContainer ref={this.container}>
        {guesses && guesses.map((guess, key) => {
          key < guesses.length/2 ? z++ : z--;
          return <HistoryGuess styleProps={{zIndex: `${z}`}} key={key} guessInfo={guess[1]} />
        })}
      </GuessListContainer>
    )
  }
}

export default HistoryContainer;
