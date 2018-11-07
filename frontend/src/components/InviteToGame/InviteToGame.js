import React, { Component } from 'react';
import Lottie from 'react-lottie';
import DirectionButton from '../DirectionButton/DirectionButton';
import OneUserInviteCard from '../OneUserInviteCard/OneUserInviteCard';
import firebase from '../../utils/firebase';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import {
  InvitePeopleToPlay,
  InvitePageHeader,
  AllUsers,
  OneUser,
} from './style';

class InviteToGame extends Component {

  state = {
    users: false,
    invitedUsers: [],
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    firebase.database().ref(`users`).on('value', (data) => {
      const users = Object.values(data.val());
      this.setState({users})
      console.log(this.state.users);
    })
  }

  render() {
    const {users} = this.state;

    return (
      <InvitePeopleToPlay>
        <div className="bg">
          <Lottie style={{position: "absolute", top: "0"}} options={optionsBackgroundAnimGrey} isStopped={false}/>
          <Lottie style={{position: "absolute", top: "0"}} options={optionsBackgroundAnimPink} isStopped={false}/>
        </div>
        <InvitePageHeader>
          <div className="topContent">
            <DirectionButton text="Tillbaka" arrowLeft={true}/>
            <p>Välj 1-4 motståndare</p>
          </div>
          <input type="text" placeholder="Sök"/>
        </InvitePageHeader>
        <AllUsers>
          <h2>20 frågor-vänner</h2>
          {users && users.map((user, key) => {
            return (
              <OneUserInviteCard
                key={key}
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
