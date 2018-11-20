import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import {
  GameCardLinkContainer,
  GamePicBlurred,
  GameInfo,
  AnswereButton
} from './style.js';
import { Link } from "@reach/router";

class GameCardInvited extends Component {

  state = {
    owner: false,
  }

  _isMounted = true;

  componentDidMount() {
    let name = this.props.owner.split(" ");
    this.setState({owner: name[0]})
    this.updateCanvas();
  }

  updateCanvas = () => {
    if (this.refs.canvas) {
    const ctx = this.refs.canvas.getContext('2d'),
    img = new Image();
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    img.onload = () => {
      var size = 7.5 * 0.01,
      w = this.refs.canvas.width * size,
      h = this.refs.canvas.height * size;
      ctx.drawImage(img, 0, 0, w, h);
      ctx.drawImage(this.refs.canvas, 0, 0, w, h, 0, 0, this.refs.canvas.width, this.refs.canvas.height);
    };
    img.src = this.props.image;
  }
  }

  denyInvite = () => {
    firebase.database()
    .ref(`games/${this.props.gameID}`)
    .remove();
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {

    return (
      <GameCardLinkContainer>
        <GamePicBlurred>
          <canvas ref="canvas" width={"100%"} height={"100%"}/>
          <p></p>
        </GamePicBlurred>
        <GameInfo answere={this.state.answereRecieved}>
          <div className="textAndButtons">
            <h3>{this.state.owner} vill spela</h3>
            <div className="buttons">
              <Link to={this.props.redirectTo}>
                <AnswereButton color={"var(--victory-blue)"}>Acceptera</AnswereButton>
              </Link>
              <AnswereButton onClick={this.denyInvite} color={"var(--error-red)"}>Neka</AnswereButton>
            </div>
          </div>
        </GameInfo>
      </GameCardLinkContainer>
    )
  }
}

export default GameCardInvited;
