import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Swiper from 'react-id-swiper';
import Lottie from 'react-lottie';
import {
  optionsWaitingAutoplay,
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import DirectionButton from '../DirectionButton/DirectionButton';
import BackToHome from '../BackToHome/BackToHome';
import HistoryContainer from '../HistoryContainer/HistoryContainer';
import {
  AllGameContainer,
  GameContainer,
  GameHeader,
  GameFooter,
  History,
  AnswereGuessContainer,
  GuessCardHeader,
  IncomingGuessCard,
  GuessCardFooter,
  AnswereButton,
  CardSwiperArea,
  WaitingAnim
 } from './style';

class GameOwnerView extends Component {

  state = {
    thisGame: false,
    thisGamesAnsweredGuesses: [],
    lastGuess: false,
    opponents: [],
    answereToQuestion: null,
    response: false,
  }

  _isMounted = true;

  componentDidMount() {
    if (this._isMounted) {
      this.getThisGame();
      this.getAllGuesses();
    }
  }

  getThisGame = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .on('value', (data) => {
      if (this._isMounted) {
        this.setState({thisGame: data.val()})
        console.log(data.val());
        let players = firebase.database().ref(`users`).orderByChild('uid').equalTo(`${data.val().gameGuesserId}`);
        if (players) {
          players.on('value', (snapshot) => {
            if (snapshot.val()) {
              this.setState({opponents: Object.values(snapshot.val())[0]})
              console.log(this.state.opponents);
            }
          })
        }
      }
    })
  }

  getAllGuesses = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}/guesses`)
    .on('value', (data) => {
      if (data.val()) {
        const answeredQuestionsList = [];
        if (this._isMounted) {
        Object.entries(data.val()).map(guess => {
          if (guess[1].answere != null) {
            answeredQuestionsList.push(guess);
          }
          return answeredQuestionsList;
        })
      }
        console.log(answeredQuestionsList);
        if (this._isMounted) {
          this.setState({thisGamesAnsweredGuesses: answeredQuestionsList})
          this.setState({
            lastGuess: Object.entries(data.val()).slice(-1)[0][1].answere ? false : Object.entries(data.val()).slice(-1)[0],
            slideLeft: false,
          })
        }
      }
    });
  }

  answereQuestion = (thisGuess, answere) => {
    firebase.database().ref(`games/${this.props.gameID}/guesses/${thisGuess}`)
    .update({
      answere: answere,
    })
    firebase.database().ref(`games/${this.props.gameID}/remainingGuesses`)
    .transaction((remainingGuesses) => {
      return remainingGuesses = remainingGuesses - 1;
    })
    if (this._isMounted) {
      this.setState({lastGuess: false})
    }
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  constructor(props) {
      super(props)
      this.swiper = null
      this.cardSwiper = React.createRef();
      this.gameContainer = React.createRef();
    }

    goNext = () => {
      if (this.swiper) this.swiper.slideNext();
    }

    goPrev = () => {
      if (this.swiper) this.swiper.slidePrev();
    }

  value = 0;

  slideSend = () => {
    if (this.state.lastGuess) {
      if (this.value < -60) {
        this.setState({answereToQuestion: true, response: "Ja!"})
        setTimeout(() => {
          this.answereQuestion(this.state.lastGuess[0], true);
          this.setState({answereToQuestion: null, response: false, slideLeft: true})
          this.value = 0;
        }, 3000)
      } else if (this.value > 60) {
        this.setState({answereToQuestion: false, response: "Nej!"})
        setTimeout(() => {
          this.answereQuestion(this.state.lastGuess[0], false);
          this.setState({answereToQuestion: null, response: false, slideLeft: true})
          this.value = 0;
        }, 3000)
      }
    }
  }

  render() {
    const {lastGuess, thisGame, thisGamesAnsweredGuesses, opponents, answereToQuestion, response} = this.state;
    const params = {
      speed: 600,
    };

    const verticalParams = {
      on : {
        transitionStart: () => this.setState({slideValue: 0}),
        sliderMove: () => {
          let transformValue = this.cardSwiper.current.childNodes[0].childNodes[0].style.transform;
          let getChangableValue = transformValue.split(',');
          let theValue = parseInt(getChangableValue[1]);
          this.value = theValue;
        },

      }
    }
    return(
      <AllGameContainer ref={this.gameContainer} answere={answereToQuestion}>

        <div className="bg" >
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
            <HistoryContainer guesses={thisGamesAnsweredGuesses} />
            {/*{thisGamesAnsweredGuesses && thisGamesAnsweredGuesses.slice(0).reverse().map((game, key) => {
              return <div key={key}>
                <p>{game[1].guess}</p>
                <button onClick={() => this.answereQuestion(game[0], true)}>Yes</button>
                <button onClick={() => this.answereQuestion(game[0], false)}>No</button>
              </div>
            })}*/}
            <div className="historyFooter">
              <DirectionButton text="Fråga" arrowRight={true} swipe={this.goNext}/>
            </div>
          </History>
          <GameContainer>
            <GameHeader>
              <div className="blurredImage" style={{backgroundImage: `url(${thisGame.secretPersonImage})`}}></div>
              <div className="headerText" style={{color: response ? "white" : "var(--text-grey)"}}>
                <p className="guessNr">{thisGame.remainingGuesses >= 0 && `${20-thisGame.remainingGuesses}`}<span>/20</span></p>
                <p className="secretPerson">{thisGame && thisGame.secretPerson}</p>
              </div>
            </GameHeader>

            <AnswereGuessContainer>
              <div style={{opacity: response ? 0 : 1, transition: "all 0.3s ease"}}>
                <AnswereButton yes style={{
                  opacity: lastGuess ? 1 : 0.3,
                  pointerEvents: lastGuess ? "auto" : "none",

                }}>
                  <img
                    src={require('./icons/yes.svg')}
                    alt=""/>
                </AnswereButton>
              </div>
              <CardSwiperArea ref={this.cardSwiper} slide={this.state.slideLeft}>
                <Swiper {...verticalParams} direction={'vertical'} style={{overflow: "visible"}}>
                  <IncomingGuessCard onTouchEnd={this.slideSend} questionArrived={lastGuess}>
                    <GuessCardHeader>
                      <div className="guessInfo">
                        <p>{`${20-thisGame.remainingGuesses}`}</p>
                        <div className="lastGuesser" style={{backgroundImage: opponents.photo ? `url(${opponents.photo})` : `url(${require('./bjornborgpixel.jpg')})`}}></div>
                      </div>
                    </GuessCardHeader>
                    {lastGuess
                      ? <div className="questionText">{lastGuess[1].guess && lastGuess[1].guess}</div>
                      : <div className="questionTextWaiting">Väntar på nästa fråga</div>
                    }
                    <GuessCardFooter>
                      {response && <p className="response">{response}</p>}
                      {!response
                        ?  <WaitingAnim questionArrived={lastGuess}>
                            <Lottie options={optionsWaitingAutoplay}
                              height={50}
                              width={50}
                              isStopped={false}/>
                            </WaitingAnim>
                        : <img src={response === "Ja!" ? require('./icons/correct.svg') : require('./icons/wrong.svg')} alt=""/>
                      }
                    </GuessCardFooter>
                  </IncomingGuessCard>
                </Swiper>
              </CardSwiperArea>
              <div style={{opacity: response ? 0 : 1, transition: "all 0.3s ease"}}>
                <AnswereButton style={{
                  opacity: lastGuess ? 1 : 0.3,
                  pointerEvents: lastGuess ? "auto" : "none",
                }}>
                  <img
                    src={require('./icons/no.svg')}
                    alt=""/>
                </AnswereButton>
              </div>
            </AnswereGuessContainer>

            <GameFooter>
              <DirectionButton
                textColor={response ? "white" : "var(--text-grey)"}
                text="Ställda frågor"
                arrowLeft={true}
                swipe={this.goPrev}
                arrowColor={response ? "#FFFFFF" : "var(--text-grey)"}
              />
              <BackToHome iconColor={response ? "white" : "var(--text-grey)"} />
            </GameFooter>

          </GameContainer>

        </Swiper>
    </AllGameContainer>
    )
  }
}

export default GameOwnerView;
