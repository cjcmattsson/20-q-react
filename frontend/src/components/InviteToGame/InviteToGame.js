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
} from './style';

class InviteToGame extends Component {

  state = {
    users: false,
    invitedUsers: false,
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

  render() {
    const {users, invitedUsers} = this.state;

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
        {invitedUsers ? invitedUsers.map((user, key) => {
        return <h1 key={key}>{user}</h1>
      }) : <div>empty</div>
      }
        <AllUsers>
          <h2>20 frågor-vänner</h2>
          {users && users.map((user, key) => {
            return (
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
