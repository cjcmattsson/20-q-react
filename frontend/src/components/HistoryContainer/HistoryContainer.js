import React, { Component } from 'react';
import HistoryGuess from '../HistoryGuess/HistoryGuess';

class HistoryContainer extends Component {

  constructor(props) {
   super(props);
   this.historyItem = React.createRef();
   this.container = React.createRef();
 }

 showChildren = () => {
  this.container.current.childNodes.forEach(child => {
     console.log(child.offsetTop);
   })
 }

  render() {
    const {guesses} = this.props;
    let z = 0;
    return (
      <div className="guessList" ref={this.container} >
        {guesses && guesses.map((guess, key) => {
          key < guesses.length/2 ? z++ : z--;
          return (
            <HistoryGuess
              ref={this.historyItem}
              key={key}
              styleProps={{backgroundColor: guess[1].answere ? "green" : "red", zIndex: `${z}`}}
              content={guess[1].guess}/>)
        })}
      </div>
    )
  }
}

export default HistoryContainer;
