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
  SendFinalGuess,
  FinalGuessResultWrapper,
  FinalGuessContent,
  PlayAgainButton
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
    finalGuessIsSent: false,
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

/*THIS IS WHERE THE GUESS CODE GOES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

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
    this.setState({chosenPerson: "", chosenImg: "", secretPerson: ""})
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
    console.log(correctAnswere === guess);
    if (correctAnswere === guess) {
      this.setState({resultOfGuess: true, finalGuessIsSent: true})
      firebase.database().ref(`games/${this.props.gameID}`)
      .update({
        theGuessersGuess: true,
      })
      firebase.database().ref(`users`).orderByChild('uid').equalTo(`${this.state.thisGame.gameGuesserId}`).once('value', snapshot => {
        if (snapshot.val()) {
          let prevWins = Object.values(snapshot.val())[0].wins;
          let newWins = prevWins + 1;
          snapshot.forEach(child => {
            child.ref.update({wins: newWins})
          })
        }
      })
      firebase.database().ref(`users`).orderByChild('uid').equalTo(`${this.state.thisGame.gameOwnerId}`).once('value', snapshot => {
        if (snapshot.val()) {
          let prevLosses = Object.values(snapshot.val())[0].losses;
          let newLosses = prevLosses + 1;
          snapshot.forEach(child => {
            child.ref.update({losses: newLosses})
          })
        }
      })

    } else {
      this.setState({resultOfGuess: false, finalGuessIsSent: true})
      firebase.database().ref(`games/${this.props.gameID}`)
      .update({
        theGuessersGuess: false,
      })
      firebase.database().ref(`users`).orderByChild('uid').equalTo(`${this.state.thisGame.gameOwnerId}`).once('value', snapshot => {
        if (snapshot.val()) {
          let prevWins = Object.values(snapshot.val())[0].wins;
          let newWins = prevWins + 1;
          snapshot.forEach(child => {
            child.ref.update({wins: newWins})
          })
        }
      })
      firebase.database().ref(`users`).orderByChild('uid').equalTo(`${this.state.thisGame.gameGuesserId}`).once('value', snapshot => {
        if (snapshot.val()) {
          let prevLosses = Object.values(snapshot.val())[0].losses;
          let newLosses = prevLosses + 1;
          snapshot.forEach(child => {
            child.ref.update({losses: newLosses})
          })
        }
      })
    }
  }


/*THIS IS WHERE THE GUESS CODE GOES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/


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
        this.updateCanvas(data.val().secretPersonImage);
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

    updateCanvas = (setImage) => {
      const ctx = this.refs.canvas.getContext('2d'),
          img = new Image();
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      img.onload = () => {
        var size = 15 * 0.01,
            w = this.refs.canvas.width * size,
            h = this.refs.canvas.height * size;
        ctx.drawImage(img, 0, 0, w, h);
        ctx.drawImage(this.refs.canvas, 0, 0, w, h, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
      };
      img.src = setImage;
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

    const optionsResultOfFinalGuess = {
      loop: false,
      autoplay: true,
      animationData: this.state.resultOfGuess ? require('./anims/guessright.json') : require('./anims/guesswrong.json'),
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
      finalGuessIsSent,
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
          noSwiping={guessWhoItIs}
          initialSlide={1}
          ref={node => {if(node) this.swiper = node.swiper}}>
          <History>
            <HistoryContainer guesses={thisGamesGuesses} />
            <div className="historyFooter">
              <DirectionButton text={"Tillbaka"} arrowRight={true} swipe={this.goNext}/>
            </div>
          </History>

          <GameContainer>


        {/*THIS IS WHERE THE GUESS CODE GOES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}


            {guessWhoItIs && <GuessWhoItIsContainer sizeOfCard={this.state.unMountGuess}>
              {finalGuessIsSent &&
              <Lottie
                style={{width: "100%", top: 0, left: 0, position: "absolute"}}
                options={optionsResultOfFinalGuess}
                isStopped={true}
              />}
              {finalGuessIsSent &&
                <FinalGuessResultWrapper>
                  <FinalGuessContent>
                    <p>{resultOfGuess ? "Du gissade rätt!" : "Åh nej, det var fel!"}</p>
                    <div className="image" style={{backgroundImage: `url(${thisGame.secretPersonImage})`}}> </div>
                    <p>{resultOfGuess ? `${thisGame.secretPerson}` : `${thisGame.secretPerson} var rätt svar`} </p>
                    <div className="playAgainButton">
                      <p>
                        Spela igen!
                      </p>
                      {resultOfGuess
                        ? <PlayAgainButton color={"var(--error-red)"}></PlayAgainButton>
                        : <PlayAgainButton color={"var(--victory-blue)"}></PlayAgainButton>
                      }
                    </div>
                  </FinalGuessContent>
                  <div className="goHome">
                    <BackToHome white={true}/>
                  </div>
                </FinalGuessResultWrapper>
              }
              <h2>Jag tror att det är:</h2>
              {this.state.chosenPerson ?
                <SearchResult onClick={this.unSelectPerson}>
                  <div className="profilePic" style={{backgroundImage: this.state.chosenImg && `url(${this.state.chosenImg})`}}></div>
                  <p>{this.state.chosenPerson}</p>
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
                <SendFinalGuess onClick={this.seeIfCorrectAnswere} style={{opacity: finalGuessIsSent ? 0 : 1, pointerEvents: finalGuessIsSent ? "none" : "auto"}}>
                  <img src={require('./send.svg')} alt=""/>
                </SendFinalGuess>
                {<div className="goBack" style={{opacity: finalGuessIsSent ? 0 : 1, pointerEvents: finalGuessIsSent ? "none" : "auto"}} onClick={this.unMountGuess}>
                  <DirectionButton text="Tillbaka" arrowLeft={true}/>
                </div>}
              </GuessWhoItIsContainer>}


        {/*THIS IS WHERE THE GUESS CODE ENDS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}

            <GameHeader>
              <div className="blurredImage">
                <canvas ref="canvas" width={"100%"} height={"100%"}/>
              </div>
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
