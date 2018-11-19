import React, { Component } from 'react';
import Lottie from 'react-lottie';
import DirectionButton from '../DirectionButton/DirectionButton';
import OneUserInviteCard from '../OneUserInviteCard/OneUserInviteCard';
import NoLinkButton from '../NoLinkButton/NoLinkButton';
import { Link } from '@reach/router';
import firebase from '../../utils/firebase';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import {
  InvitePeopleToPlay,
  InvitePageHeader,
  AllUsers,
  InvitedUsers,
  StartGameSection
} from './style';

class InviteToGame extends Component {

  state = {
    users: false,
    searchField: "",
    searchResult: false,
  }

  componentDidMount() {
    this.getAllUsers();
    this.searchUsers();
  }

  getAllUsers = () => {
    firebase.database().ref(`users`).on('value', (data) => {
      const users = Object.values(data.val());
      let allUsers = [];
      users.forEach(user => {
        if (user.name && user.uid === this.props.user.uid) {
          return;
        } else {
          allUsers.push(user);
        }
      })
      this.setState({users: allUsers})
    })
  }

  searchUsers = () => {
    let searchString = `${this.state.searchField}`;
    let userSearch = firebase.database().ref(`users`).orderByChild('name').equalTo(`${searchString}`);
    if (userSearch) {
      userSearch.on('value', (data) => {
        if (data.val()) {
          console.log(data.val());
          this.setState({searchResult: data.val()})
        }
      })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value,});
  }

  componentDidUpdate() {
    this.searchUsers();
  }

  render() {
    const {users, searchField} = this.state;

    return (
      <InvitePeopleToPlay>
        <div className="bg">
          <Lottie style={{position: "absolute", top: "0"}} options={optionsBackgroundAnimGrey} isStopped={false}/>
          <Lottie style={{position: "absolute", top: "0"}} options={optionsBackgroundAnimPink} isStopped={false}/>
        </div>
        <InvitePageHeader>
          <div className="topContent">
            <Link to="/">
              <DirectionButton text="Tillbaka" arrowLeft={true}/>
            </Link>
            <p>Välj en motståndare</p>
          </div>
          <input type="text" onChange={this.handleChange} name="searchField" placeholder="Sök" value={searchField}/>
        </InvitePageHeader>
          {this.props.selectedPlayer
            && <StartGameSection>
                <InvitedUsers>
                  <div className="image" style={{backgroundImage: `url(${this.props.selectedPlayer.photo})`}}></div>
                  <div className="text">
                  </div>
                </InvitedUsers>
                <NoLinkButton text={"Starta spel"} color={"var(--strong-pink)"} function={this.props.nextSwiperSlide}/>
              </StartGameSection>}
        <AllUsers>
          <h2>20 frågor-vänner</h2>
          {users && users.map((user, key) => {
            return (user.name &&
              <OneUserInviteCard
                key={key}
                myFunc={this.props.addUser}
                name={user.name}
                photo={user.photo}
                for={key}
                value={user.uid}
                id={key}/>
            )
          })}
        </AllUsers>
      </InvitePeopleToPlay>
    )
  }
}

export default InviteToGame;
