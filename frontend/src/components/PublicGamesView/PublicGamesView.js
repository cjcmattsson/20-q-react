import React, { Component } from 'react';
import firebase from '../../utils/firebase';

class PublicGamesView extends Component {

  state = {
    allGames : [],
  }

  componentDidMount() {
    const database = firebase.database();
    const games = database.ref('games');
    games.on('value', (data) => {
      console.log(Object.values(data.val()))
      this.setState({allGames : Object.values(data.val())})
    });
  }

  render() {
    return (
      <div className="publicGamesView">
        <h1>Join a game!</h1>
        {this.state.allGames &&
          this.state.allGames.map((game, key) => {
            return <div key={key}>
                      <h2>Spela med: {game.gameOwnerName}</h2>
                      <p>(pssst! Rätt svar är {game.secretPerson})</p>
                    </div>
          })
        }
      </div>
    )
  }
}

export default PublicGamesView;
