import React, { Component } from 'react';
import './CreateGameView.css';
import firebase from '../../utils/firebase';

class CreateGameView extends Component {

  state = {
    secretPerson : "",
    wikiApiRequest: [],
  }

  searchWikiApi = () => {
    if (this.state.secretPerson) {
      fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=intitle:${this.state.secretPerson}&format=json&srlimit=3&origin=*`)
      .then(res => res.json())
      .then((result) => {
        const searchResults = result.query.search;
        this.setState({wikiApiRequest: searchResults})
        console.log(this.state.wikiApiRequest);
      })
    }
    if (this.state.wikiApiRequest === []) {
      this.setState({wikiApiRequest: false})
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value,});
  }

  createGame = (e) => {
    e.preventDefault();
    const database = firebase.database();
    const games = database.ref('games');
    const game = {
      secretPerson: this.state.secretPerson,
      remainingGuesses: 20,
      gameOwnerId: firebase.auth().currentUser.uid,
      gameOwnerName: firebase.auth().currentUser.displayName,
    }
    games.push(game);
    this.setState({secretPerson: ""})
  }

  render() {
    return (
      <div className="createGameView">
        <h1>Create Game!! :D</h1>
        <form>
          <input value={this.state.secretPerson} onChange={this.handleChange} onKeyUp={this.searchWikiApi} name="secretPerson" type="text" className="person"/>
          <button type="submit" onClick={this.createGame}>Start game</button>
        </form>
        <ul>
          {this.state.wikiApiRequest &&
            this.state.wikiApiRequest.map((person, key) => {
              return <li key={key}>{person.title}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default CreateGameView;
