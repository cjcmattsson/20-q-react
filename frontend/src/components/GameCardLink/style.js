import styled from 'styled-components';

export const GameCardLinkContainer = styled.div `
  border-radius: 4px;
  -webkit-box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  margin-top: 8px;

  a {
    height: 71px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;
    color: white;

    .gamePicBlurred {
      height: 100%;
      width: 71px;
      border-radius: 4px 0 0 4px;
      background-color: salmon;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .gameInfo {
      color: black;
      flex: 1;
      height: 100%;
      padding: 8px 16px;
      p, h3 {
        margin: 0;
      }
    }

  }

`;
