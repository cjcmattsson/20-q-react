import styled from 'styled-components';

export const GameCardLinkContainer = styled.div `
  border-radius: 4px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  margin-top: 8px;
  height: 71px;
  width: 100%;
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  text-decoration: none;
  color: white;
`;

export const GamePicBlurred = styled.div `
  height: 100%;
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

  p {
    height: 71px;
    width: 71px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    position: absolute;
    border-radius: 4px 0 0 4px;
    background-color: rgba(0, 0, 0, 0.30);
    font-family: "Manrope Semibold";
    font-size: 16px;
  }
`;

export const GameInfo = styled.div `
  transition: all 0.5s ease;
  color: black;
  flex: 1;
  height: 100%;
  padding: 8px 8px 8px 8px;
  border-radius: 0 4px 4px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p, h3 {
    margin: 0;
    font-family: "Manrope Semibold";
    color: var(--text-grey);
  }
  h3 {font-size: 16px;}
  p {font-size: 11px;}

  .textAndButtons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    .buttons {
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
  }
`;

export const AnswereButton = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 31px;
  background-color: ${props => props.color};
  width: 92px;
  height: 26px;
  color: white;
  font-size: 11px;
  font-family: "Manrope Semibold";
  text-transform: uppercase;
  margin-right: 4px;
`
