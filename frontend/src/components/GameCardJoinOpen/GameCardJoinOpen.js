import React, { Component } from 'react';
import {
  GameCardLinkContainer,
  GamePicBlurred,
  GameInfo
 } from './style.js';
import { Link } from "@reach/router";

class GameCardJoinOpen extends Component {

  _isMounted = true;

  componentDidMount() {
    this.updateCanvas();
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  updateCanvas = () => {
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
    img.src = this.props.image;
  }

  render() {

    return (
      <GameCardLinkContainer>
        <Link to={this.props.redirectTo}>
        <GamePicBlurred>
          <canvas ref="canvas" width={"100%"} height={"100%"}/>
        </GamePicBlurred>
        <GameInfo>
          <h3>Börja gissa!</h3>
          <div className="opponent">
            {this.props.ownerImage && <div className="imageHere" style={{backgroundImage: this.props.ownerImage && `url(${this.props.ownerImage})`}}> </div> }
            {this.props.ownerName && <p>{this.props.ownerName}</p>}
          </div>
        </GameInfo>
      </Link>
      </GameCardLinkContainer>
    )
  }
}

export default GameCardJoinOpen;
