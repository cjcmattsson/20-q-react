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
    invitedUsers: false,
    selectedPlayer: false,
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
      this.setState({users})
      console.log(this.state.users);
    })
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

  searchUsers = () => {
    let searchString = `${this.state.searchField}`;
    let userSearch = firebase.database().ref(`users`).orderByChild('name').startAt(`${searchString}`).endAt(`${searchString}\uf8ff`);
    if (userSearch) {
      userSearch.on('value', (data) => {
        if (data.val()) {
          console.log(data.val());
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
    const {users, selectedPlayer, searchField, searchResult} = this.state;

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
          {selectedPlayer
            ? <StartGameSection>
                <InvitedUsers>
                  <div className="image" style={{backgroundImage: `url(${selectedPlayer.photo})`}}></div>
                  <div className="text">
                    <p>Spela med:</p>
                    <p>{selectedPlayer.name}</p>
                  </div>
                </InvitedUsers>
                <NoLinkButton text={"Starta spel"} color={"var(--strong-pink)"} function={this.props.nextSwiperSlide}/>
              </StartGameSection>
            : <div>no one invited</div>}
        <AllUsers>
          <h2>20 frågor-vänner</h2>
          {users && users.map((user, key) => {
            return (user.name &&
              <OneUserInviteCard
                key={key}
                myFunc={this.addUser}
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
