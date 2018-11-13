import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import GameCardJoinOpen from '../GameCardJoinOpen/GameCardJoinOpen';
import DirectionButton from '../DirectionButton/DirectionButton';
import NoLinkButton from '../NoLinkButton/NoLinkButton';
import {
  PublicGamesViewContainer,
  PublicGamesHeader,
  PublicGamesWrapper,
  CreatePublicGameButton,
  GamesList
 } from './style';
import { Link } from '@reach/router';
import Lottie from 'react-lottie';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import Swiper from 'react-id-swiper';


class PublicGamesView extends Component {

  state = {
    publicGames: null,
  }

  componentDidMount() {
    this.getPublicGames();
  }

  getPublicGames = () => {
    firebase.database().ref('games').orderByChild('gameGuesserId').equalTo(null).on('value', data => {
      if (data.val()) {
        let publicGames = Object.entries(data.val());
        this.setState({publicGames})
      }
    })
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

    const {publicGames} = this.state;

    return (
      <div>
        <PublicGamesViewContainer>
          <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper}}>
            <PublicGamesWrapper>
              <div className="bg">
                <Lottie style={{position: "absolute", top: "0"}} options={optionsBackgroundAnimGrey} isStopped={false}/>
                <Lottie style={{position: "absolute", top: "0"}} options={optionsBackgroundAnimPink} isStopped={false}/>
              </div>
              <PublicGamesHeader>
                <Link to="/">
                  <DirectionButton text="Tillbaka" arrowLeft={true}/>
                </Link>
              </PublicGamesHeader>
              <h3 className="listHeader">Joina öppet spel!</h3>
              <GamesList>
                {publicGames && publicGames.map((game, key) => {
                  return (
                    <GameCardJoinOpen
                      key={key}
                      user={this.props.user}
                      redirectTo={`/gameGuesserView/${game[0]}`}
                      ownerName={game[1].gameOwnerName}
                      ownerImage={game[1].gameOwnerImage}
                      image={game[1].secretPersonImage}
                    />
                  )
                })}
              </GamesList>

              <CreatePublicGameButton>
                <NoLinkButton text={"Starta öppet spel"} color={"var(--strong-pink)"} function={this.goNext}/>
              </CreatePublicGameButton>

            </PublicGamesWrapper>
            <div>
              hejhej
            </div>

          </Swiper>


        </PublicGamesViewContainer>
      </div>
    )
  }
}

export default PublicGamesView;
