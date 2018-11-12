import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import Lottie from 'react-lottie';
import HistoryContainer from '../HistoryContainer/HistoryContainer';
import DirectionButton from '../DirectionButton/DirectionButton';
import BackToHome from '../BackToHome/BackToHome';
import NoLinkButton from '../NoLinkButton/NoLinkButton';
import {
  optionsSend,
  optionsWaiting,
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import {
  AllGameContainer,
  GameContainer,
  GameHeader,
  GuessCard,
  GameFooter,
  History,
  GuessCardHeader,
  GuessWhoItIsContainer,
  SearchResultWrapper,
  SearchResult,
  StarGameButton,
} from './style';

class GameGuesserView extends Component {

  state = {
    guessInputField: "",
    thisGame: false,
    thisGamesGuesses: false,
    questionIsNotSent: true,
    waitingForAnswere: false,
    answere: null,
    answereRecieved: false,
    lastGuess: null,

    secretPerson : "",
    wikiApiRequest: [],
    chosenPerson: "",
    chosenImg: "",
    guessWhoItIs: false,
    unMountGuess: false,
    resultOfGuess: null,
  }

  _isMounted = true;

  componentDidMount() {
    if (this._isMounted) {
      this.getThisGame();
      this.checkIfAnswereRecieved();
      if (localStorage.getItem("waitingForAnswere")) {
        this.setState({waitingForAnswere: true, questionIsNotSent: false})
      }
      this.getAllGuesses();
      this.checkIfThereAreAnyGuesses();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate() {
    if (this.state.answereRecieved === true) {
      this.checkIfAnswereRecieved();
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

  selectSecretPerson = (person) => {
    const name = person.title;
    const image = person.thumbnail ? person.thumbnail.source : "https://banner2.kisspng.com/20180131/fvw/kisspng-question-mark-icon-question-mark-5a7214f2980a92.2259030715174259066228.jpg";
    this.setState({chosenPerson: name, chosenImg: image, wikiApiRequest: []})
  }

  unSelectPerson = () => {
    this.setState({chosenPerson: "", chosenImg: ""})
  }

  mountGuess = () => {
    this.setState({guessWhoItIs: true,})
  }

  unMountGuess = () => {
    this.setState({unMountGuess: true})
    setTimeout(() => {
      this.setState({guessWhoItIs: false, unMountGuess: false})
    }, 1000)
  }

  seeIfCorrectAnswere = () => {
    let correctAnswere = this.state.thisGame.secretPerson;
    let guess = this.state.chosenPerson;
    console.log(correctAnswere == guess);
    if (correctAnswere == guess) {
      {/*RÄTT means CORRECT in swedish*/}
      this.setState({resultOfGuess: "rätt"})
      firebase.database().ref(`games/${this.props.gameID}`)
      .push({
        theGuessersGuess: this.state.guessInputField,
      })
    } else {
      {/*FEL means WRONG in swedish*/}
      this.setState({resultOfGuess: "fel"})
    }
  }

  sendGuess = (game) => {
    firebase.database().ref(`games/${this.props.gameID}/guesses`)
    .push({
      guess: this.state.guessInputField,
    })
    firebase.database().ref(`games/${this.props.gameID}/remainingGuesses`)
    .transaction((remainingGuesses) => {
      if (remainingGuesses) {
        remainingGuesses = remainingGuesses - 1;
      }
      return remainingGuesses;
    })
    this.setState({questionIsNotSent: false})
    setTimeout(() => {
      this.setState({waitingForAnswere: true});
      localStorage.setItem('waitingForAnswere', true);
    }, 1200);
  }


  checkIfThereAreAnyGuesses = () => {
      firebase.database().ref(`games/${this.props.gameID}/guesses`).on('value', (data) => {
      console.log(data.val());
      if (data.val() === null) {
        this.setState({waitingForAnswere: false, questionIsNotSent: true})
      }
    });
  }

  checkIfAnswereRecieved = () => {
    setTimeout(() => {
      if (this.state.answereRecieved === true) {
        this.setState({
          answere: null,
          answereRecieved: false,
          questionIsNotSent: true,
          waitingForAnswere: false,
          lastGuess: false,
          guessInputField: "",
        })
      }
    }, 2500)
  }

  getThisGame = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .on('value', (data) => {
        this.setState({thisGame: data.val()})
        console.log(data.val());
        if (data.val().waitingForAnswere) {
          firebase.database()
          .ref(`games/${this.props.gameID}`)
          .update({
            waitingForAnswere: false,
          });
        }
    });
  }

  sendGuess = (game) => {
    firebase.database().ref(`games/${this.props.gameID}/guesses`)
    .push({
      guess: this.state.guessInputField,
    })
    firebase.database().ref(`games/${this.props.gameID}/remainingGuesses`)
    .transaction((remainingGuesses) => {
      if (remainingGuesses) {
        remainingGuesses = remainingGuesses - 1;
      }
      return remainingGuesses;
    })
    this.setState({questionIsNotSent: false})
    setTimeout(() => {
      this.setState({waitingForAnswere: true});
      localStorage.setItem('waitingForAnswere', true);
    }, 1200);
  }

  getAllGuesses = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}/guesses`)
    .on('value', (data) => {
      if (data.val()) {
          this.setState({thisGamesGuesses: Object.entries(data.val())})
          this.setState({lastGuess: Object.entries(data.val()).slice(-1)[0][1].guess});
        let latestAnswere = Object.entries(data.val()).slice(-1)[0][1].answere;
        if (latestAnswere === undefined || latestAnswere === null) {this.setState({answere: null})}
        else if (latestAnswere === true) {
          this.setState({answere: true, answereRecieved: true});
          localStorage.setItem('waitingForAnswere', false);
        }
        else if (latestAnswere === false) {
          this.setState({answere: false, answereRecieved: true});
          localStorage.setItem('waitingForAnswere', false);
        }
      }
    });
  }

  handleChange = (e) => {
    if (this._isMounted) {
      this.setState({ [e.target.className] : e.target.value});
      if (e.target.value === "") {
        this.setState({wikiApiRequest: []})
      }
    }
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

    const optionsAnswereRecieved = {
      loop: false,
      autoplay: true,
      animationData: this.state.answere === true ? require('./anims/yes.json') : require('./anims/no.json'),
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const {
      thisGame,
      thisGamesGuesses,
      questionIsNotSent,
      waitingForAnswere,
      guessWhoItIs,
      resultOfGuess,
    } = this.state;

    return(
      <AllGameContainer answere={this.state.answere}>
        <div className="bg">
          <Lottie
            style={{width: "100%", position: "absolute"}}
            options={optionsBackgroundAnimGrey}
            isStopped={false}
          />
          <Lottie
            style={{width: "100%", position: "absolute"}}
            options={optionsBackgroundAnimPink}
            isStopped={false}
          />
        </div>

        <Swiper
          {...params}
          initialSlide={1}
          ref={node => {if(node) this.swiper = node.swiper}}>
          <History>
            <HistoryContainer guesses={thisGamesGuesses} />
            <div className="historyFooter">
              <DirectionButton text={"Tillbaka"} arrowRight={true} swipe={this.goNext}/>
            </div>
          </History>

          <GameContainer>
            {guessWhoItIs && <GuessWhoItIsContainer sizeOfCard={this.state.unMountGuess}>
              <h2>{resultOfGuess ? `Du gissade ${resultOfGuess}!` : `Jag tror att det är:`}</h2>
              {this.state.chosenPerson ?
                <SearchResult>
                  <div className="profilePic" style={{backgroundImage: this.state.chosenImg && `url(${this.state.chosenImg})`}}></div>
                  <p>{this.state.chosenPerson}</p>
                  <div onClick={this.unSelectPerson}>X</div>
                </SearchResult> :
                <input
                  onChange={this.handleChange}
                  value={this.state.secretPerson}
                  onKeyUp={this.searchWikiApi}
                  name="secretPerson"
                  type="text"
                  className="secretPerson"
                  placeholder="Tänk på att du bara har en gissning"/>
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
                <StarGameButton onClick={this.seeIfCorrectAnswere}>
                  <img src={require('./send.svg')} alt=""/>
                </StarGameButton>
                <div className="goBack" onClick={this.unMountGuess}>
                  <DirectionButton text="Tillbaka" arrowLeft={true}/>
                </div>
              </GuessWhoItIsContainer>}
            <GameHeader>
              <div className="blurredImage" style={{backgroundImage: `url(${thisGame.secretPersonImage})`}}></div>
              <div className="headerText">
                <p className="guessNr">{thisGame.remainingGuesses && `${20-thisGame.remainingGuesses}/20`}</p>
                <p className="opponent">{thisGame ? `Spelar med ${thisGame.gameOwnerName}` : `Spelar med en sköning`}</p>
              </div>
            </GameHeader>

            <GuessCard answere={this.state.answere}>
              <GuessCardHeader>
                <div className="guessInfo">
                  <p>{`${20-thisGame.remainingGuesses}`}</p>
                  <div className="lastGuesser"></div>
                </div>
              </GuessCardHeader>
              {this.state.waitingForAnswere
                ? <div className="guessInputField">{this.state.lastGuess}</div>
                : <textarea
                  onChange={this.handleChange}
                  className="guessInputField"
                  value={this.state.guessInputField}
                  placeholder="Ställ din fråga här!"> </textarea>
                }
                <div className="sendGuessWrapper">
                  {this.state.answereRecieved ?
                    <div className="sendGuessButton">
                      <Lottie options={optionsAnswereRecieved}
                        height={50}
                        width={50}
                        isStopped={false}
                      />
                    </div>
                    : waitingForAnswere
                    ? <div className="sendGuessButton">
                      <Lottie options={optionsWaiting}
                        height={50}
                        width={50}
                        isStopped={questionIsNotSent}
                      />
                    </div>
                    : <div className="sendGuessButton" onClick={this.sendGuess}>
                      <Lottie options={optionsSend}
                        height={50}
                        width={50}
                        isStopped={questionIsNotSent}
                      />
                    </div>

                  }
                </div>
              </GuessCard>

              <div className="guessWhoItIs">
                <NoLinkButton function={this.mountGuess} color={"var(--strong-pink)"} text={"Jag vill gissa!"} />
              </div>

              <GameFooter>
                <DirectionButton text="Historik" arrowLeft={true} swipe={this.goPrev}/>
                <BackToHome />
              </GameFooter>

            </GameContainer>
          </Swiper>
        </AllGameContainer>
      )
    }
  }

  export default GameGuesserView;
