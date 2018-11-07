import React, { Component } from 'react';
import { OneUser } from './style';


class OneUserInviteCard extends Component {

  state = {
   checked: false,
  }

  checked = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({checked: value})
    console.log(value);
    console.log(target.value);
  }

  render () {
    return (
      <OneUser checked={this.state.checked}>
        <label className="userInfo" htmlFor={this.props.for}>
          <img src={this.props.photo} alt=""/>
          <p className="name">{this.props.name}</p>
        </label>
        <div className="selectUser">
          <input onChange={(e) => this.checked(e)} id={this.props.id} value={this.props.value} type="checkbox"/>
          <div  className="selected"></div>
        </div>
      </OneUser>
    )
  }
}

export default OneUserInviteCard;
