import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import {
  CreateGameContainer,
  SearchResultWrapper,
  SearchResult,
  StarGameButton,
 } from './style';

class CreateGameView extends Component {

  state = {
    secretPerson : "",
    wikiApiRequest: [],
  }

  searchWikiApi = () => {
    if (this.state.secretPerson) {
      fetch(`https://sv.wikipedia.org/w/api.php?action=query&list=search&srsearch=intitle:${this.state.secretPerson}&format=json&srlimit=3&origin=*`)
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
      remainingGuesses: 19,
      gameOwnerId: firebase.auth().currentUser.uid,
      gameOwnerName: firebase.auth().currentUser.displayName,
      gameGuesserId: {},
    }
    games.push(game);
    this.setState({secretPerson: ""})
  }

  render() {
    return (
      <CreateGameContainer>
        <h1>Jag tänker på: </h1>
          <input value={this.state.secretPerson} onChange={this.handleChange} onKeyUp={this.searchWikiApi} name="secretPerson" type="text" className="searchField"/>
        <SearchResultWrapper>
          {this.state.wikiApiRequest &&
            this.state.wikiApiRequest.map((person, key) => {
              return (
                <SearchResult key={key}>
                  <div className="profilePic"></div>
                  <p>{person.title}</p>
                </SearchResult>
              )
            })
          }
        </SearchResultWrapper>
        <StarGameButton onClick={this.createGame}></StarGameButton>
      </CreateGameContainer>
    )
  }
}

export default CreateGameView;
