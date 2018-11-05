import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import DirectionButton from '../DirectionButton/DirectionButton';
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
    chosenPerson: "",
    chosenImg: "",
  }

  searchWikiApi = () => {
    if (this.state.secretPerson) {
      fetch(`https://sv.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&formatversion=2&piprop=thumbnail&pithumbsize=200&pilimit=3&wbptterms=description&gpssearch=${this.state.secretPerson}&gpslimit=3&origin=*`)
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        if (result.query) {
          const searchResults = result.query.pages;
          this.setState({wikiApiRequest: searchResults})
          console.log(this.state.wikiApiRequest);
        }
      })
    }
    if (this.state.wikiApiRequest === []) {
      this.setState({wikiApiRequest: false})
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value,});
    if (e.target.value === "") {
      this.setState({wikiApiRequest: []})
    }
  }

  createGame = (e) => {
    e.preventDefault();
    const database = firebase.database();
    const games = database.ref('games');
    const game = {
      secretPerson: this.state.chosenPerson,
      secretPersonImage: this.state.chosenImg,
      remainingGuesses: 19,
      gameOwnerId: firebase.auth().currentUser.uid,
      gameOwnerName: firebase.auth().currentUser.displayName,
      gameGuesserId: {},
    }
    games.push(game);
    this.setState({secretPerson: ""})
  }

  selectSecretPerson = (person) => {
    const name = person.title;
    const image = person.thumbnail ? person.thumbnail.source : "https://banner2.kisspng.com/20180131/fvw/kisspng-question-mark-icon-question-mark-5a7214f2980a92.2259030715174259066228.jpg";
    this.setState({chosenPerson: name, chosenImg: image, wikiApiRequest: []})
  }

  unSelectPerson = () => {
    this.setState({chosenPerson: "", chosenImg: ""})
  }

  render() {
    return (
      <CreateGameContainer>
        <h2>Jag tänker på:</h2>
        {this.state.chosenPerson ?
          <SearchResult>
            <div className="profilePic" style={{backgroundImage: this.state.chosenImg && `url(${this.state.chosenImg})`}}></div>
            <p>{this.state.chosenPerson}</p>
            <div onClick={this.unSelectPerson}>X</div>
          </SearchResult> :
          <input
            value={this.state.secretPerson}
            onChange={this.handleChange}
            onKeyUp={this.searchWikiApi}
            name="secretPerson"
            type="text"
            className="searchField"
            placeholder="Personens namn"/>
          }
        <SearchResultWrapper>
          {this.state.wikiApiRequest &&
            this.state.wikiApiRequest.map((person, key) => {
              return (
                <SearchResult key={key} onClick={() => {this.selectSecretPerson(person)}}>
                  <div className="profilePic" style={{backgroundImage: person.thumbnail ? `url(${person.thumbnail.source})` : `url(${"https://banner2.kisspng.com/20180131/fvw/kisspng-question-mark-icon-question-mark-5a7214f2980a92.2259030715174259066228.jpg"})`}}></div>
                  <p>{person.title}</p>
                </SearchResult>
              )
            })
          }
        </SearchResultWrapper>
        <StarGameButton onClick={this.createGame}>
          <img src={require('./send.svg')} alt=""/>
        </StarGameButton>
        <div className="goBack">
          <DirectionButton text="Tillbaka" arrowLeft={true}/>
        </div>
      </CreateGameContainer>
    )
  }
}

export default CreateGameView;
