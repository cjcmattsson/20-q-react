import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import Lottie from 'react-lottie';
import NoLinkButton from '../NoLinkButton/NoLinkButton';
import DirectionButton from '../DirectionButton/DirectionButton';
import Swiper from 'react-id-swiper';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey,
  optionsWaitingAutoplay
} from '../utils/LottieOptions.js';
import {
  AuthViewContainer,
  AuthHeader,
  WelcomeMessage,
  UserInfoContainer,
  UserInputFields,
  RandomContentWrapper,
 } from './style.js';

class AuthView extends Component {

state = {
  usernameSignup:'',
  emailSignup:'',
  passwordSignup:'',
  emailLogin:'',
  passwordLogin:'',
}

signUp = (e) => {
  e.preventDefault();
  firebase.auth().createUserWithEmailAndPassword(this.state.emailSignup, this.state.passwordSignup)
  .then(() => {
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName: this.state.usernameSignup});
    }).catch(e => console.log(e.message));
  }

login = (e) => {
  e.preventDefault();
  const promise = firebase.auth().signInWithEmailAndPassword(this.state.emailLogin, this.state.passwordLogin);
  promise.catch(e => console.log(e.message));
}

facebookLogin = () => {
  const auth = firebase.auth
  const provider = new firebase.auth.FacebookAuthProvider();
  auth().signInWithPopup(provider);

}

handleChange = (e) => {
  this.setState({ [e.target.name] : e.target.value,});
}

constructor(props) {
    super(props)
    this.swiper = null
  }

  goNext = () => {
    if (this.swiper) this.swiper.slideNext();
    this.setState({login: !this.state.login});
  }

  goPrev = () => {
    if (this.swiper) this.swiper.slidePrev();
    this.setState({login: !this.state.login});
  }

  render() {
    const {email, password, username} = this.state;

    const params = {
      speed: 600,
    };

    return (
      <AuthViewContainer>
        <div className="bg">
          <Lottie style={{width: "100%", position: "absolute"}} options={optionsBackgroundAnimGrey} isStopped={false} />
          <Lottie style={{width: "100%", position: "absolute"}} options={optionsBackgroundAnimPink} isStopped={false} />
        </div>
        <AuthHeader>
          <div className="blob">
            <Lottie options={optionsWaitingAutoplay} isStopped={false} />
          </div>
          <WelcomeMessage>
            <h2>Hej kompis!</h2>
            <p>Här börjar din 20 frågor-resa</p>
          </WelcomeMessage>
        </AuthHeader>

        <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper}}>

          <UserInfoContainer>
            <form>
              <UserInputFields>
                <div>
                  <label htmlFor="signUpUsername">Användarnamn</label>
                  <input id="signUpUsername" value={username}  onChange={this.handleChange} type="text" name="usernameSignup" placeholder="användarnamn"/>
                </div>
                <div>
                  <label htmlFor="signUpEmail">Email</label>
                  <input id="signUpEmail" value={email} onChange={this.handleChange} type="email" name="emailSignup" placeholder="email"/>
                </div>
                <div>
                  <label htmlFor="signUpPassword">Lösenord</label>
                  <input id="signUpPassword" value={password} onChange={this.handleChange} type="password" name="passwordSignup" placeholder="lösenord"/>
                </div>
              </UserInputFields>
                <NoLinkButton
                  color={"var(--strong-pink)"}
                  text={"Skapa användare"}
                  function={this.signUp}
                  type={"submit"}/>
            </form>
          </UserInfoContainer>

          <UserInfoContainer>
            <form>
              <UserInputFields>
                <div>
                  <label htmlFor="loginEmail">Email</label>
                  <input id="loginEmail" value={email} onChange={this.handleChange} type="email" name="emailLogin" placeholder="email"/>
                </div>
                <div>
                  <label htmlFor="loginPassword">Lösenord</label>
                  <input id="loginPassword" value={password} onChange={this.handleChange} type="password" name="passwordLogin" placeholder="password"/>
                  <p>Glömt lösenordet?</p>
                </div>
              </UserInputFields>
                <NoLinkButton
                  color={"var(--strong-pink)"}
                  text={"Logga in"}
                  function={this.login}
                  type={"submit"}/>
            </form>
          </UserInfoContainer>
        </Swiper>

        <RandomContentWrapper>
          <NoLinkButton
            color={"var(--victory-blue)"}
            text={"Logga in med facebook"}
            function={this.facebookLogin}
          />

        </RandomContentWrapper>
        <div className="loginOrCreateUser">
          <DirectionButton
            text={this.state.login ? "Skapa användare" : "Logga in"}
            swipe={this.state.login ? this.goPrev : this.goNext}
            arrowLeft={this.state.login}
            arrowRight={!this.state.login}/>
        </div>
      </AuthViewContainer>
    )
  }
}

export default AuthView;
