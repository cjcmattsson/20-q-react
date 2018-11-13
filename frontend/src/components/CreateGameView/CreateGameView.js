import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import DirectionButton from '../DirectionButton/DirectionButton';
import InviteToGame from '../InviteToGame/InviteToGame';
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
    invitedUsers: false,
    selectedPlayer: false,
    chosenImg: "",
  }

  invited = [];
  addUser = (event) => {
    let invitedList = this.invited;
    if (!invitedList.includes(event.target.value)) {
      this.invited.push(event.target.value)
      this.setState({invitedUsers: invitedList})
      console.log(this.state.invitedUsers);
      let oneUser = firebase.database().ref(`users`).orderByChild('uid').equalTo(`${event.target.value}`);
      if (oneUser) {
        oneUser.on('value', (snapshot) => {
          if (snapshot.val()) {
            console.log(Object.values(snapshot.val())[0]);
            this.setState({selectedPlayer: Object.values(snapshot.val())[0]})
          }
        })
      }
    } else {
      for(var i = invitedList.length - 1; i >= 0; i--) {
        if(invitedList[i] === event.target.value) {
          invitedList.splice(i, 1);
          console.log(this.state.invitedUsers);
        }
      }
    }
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
      gameOwnerImage: firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : "./images/profile-avatar.svg",
      gameGuesserId: this.state.selectedPlayer.uid,
      gameGuesserImage: this.state.selectedPlayer.photo,
      gameGuesserName: this.state.selectedPlayer.name,
      waitingForAnswere: true,
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
    this.setState({chosenPerson: "", chosenImg: "", secretPerson: ""})
  }

  constructor(props) {
      super(props)
      this.swiper = null
    }

    goNext = () => {
      if (this.swiper) this.swiper.slideNext();
    }

    goPrev = () => {
      if (this.swiper) this.swiper.slidePrev();
    }

  render() {

    const params = {
      speed: 600,
    };
    return (
      <Swiper {...params} initialSlide={0} ref={node => {if(node) this.swiper = node.swiper}}>
        <div>
          <InviteToGame user={this.props.user} selectedPlayer={this.state.selectedPlayer} addUser={this.addUser} nextSwiperSlide={this.goNext}/>
        </div>
        <CreateGameContainer>
          <h2>Jag tänker på:</h2>
          {this.state.chosenPerson ?
            <SearchResult onClick={this.unSelectPerson}>
              <div className="profilePic" style={{backgroundImage: this.state.chosenImg && `url(${this.state.chosenImg})`}}></div>
              <p>{this.state.chosenPerson}</p>
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
            <div className="goBack" onClick={this.goPrev}>
              <DirectionButton text="Tillbaka" arrowLeft={true}/>
            </div>
          </CreateGameContainer>
        </Swiper>
      )
    }
  }

  export default CreateGameView;
