import styled from 'styled-components';

export const GameCardLinkContainer = styled.div `
  border-radius: 4px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
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
      background-size: cover;
      background-position: center;
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
