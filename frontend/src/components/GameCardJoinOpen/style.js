import styled from 'styled-components';

export const GameCardLinkContainer = styled.div `
  border-radius: 4px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  margin-top: 8px;
  background-color: white;

  a {
    height: 71px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;
    color: white;
  }

`;

export const GamePicBlurred = styled.div `
  height: 71px;
  width: 71px;
  border-radius: 4px 0 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;

  canvas {
    border-radius: 4px 0 0 4px;
    height: 100%;
  }
`;

export const GameInfo = styled.div `
  padding: 8px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;

  p, h3 {
    margin: 0;
    font-family: "Manrope Semibold";
    color: var(--text-grey);
  }
  h3 {font-size: 16px;}
  p {font-size: 11px;}

  .opponent {
    display: flex;
    flex-direction: row;
    align-items: center;

    .imageHere {
      height: 23px;
      width: 23px;
      margin-right: 4px;
      outline: none;
      background-position: center;
      background-size: cover;
      border-radius: 2px;
    }
  }

`;
