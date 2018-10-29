import styled from 'styled-components';
import bg from './cows.jpg';

export const AllGameContainer = styled.div `
.parallax-bg {
    ${'' /* background-image: url(${bg}); */}
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: left;
}
`;

export const GameContainer = styled.div `
  height: 100vh;
  width: 100vw;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
  }
`;

export const GameHeader = styled.div `
    width: 100%;
    height: 61px;
    display: flex;
    flex-direction: row;

    .blurredImage {
      height: 61px;
      width: 61px;
      background-color:hotpink;
    }

    .headerText {
      padding-left: 10px;
      text-align: left;

      p {
        margin: 0;
      }
    }
  }
`;

export const GuessCard = styled.div `
  width: 100%;
  height: 320px;
  border: 1px solid black;
  padding: 15px;

  .guessInputField {
    width: 100%;
    height: 80%;
    font-size: 30px;

    &:focus {
      outline: none;
    }
  }

  .sendGuess {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const GuessCardHeader = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 0;
    font-size: 25px;
  }

  .guessInfo {
    display: flex;
    flex-direction: row;
    align-items: center;

    .lastGuesser {
      height: 25px;
      width: 25px;
      margin-left: 10px;
      border-radius: 25px;
      background-color: hotpink;
    }
  }
`;

export const GuessWhoItIs = styled.div `
  width: 70%;
  height: 61px;
  border: 1px solid black;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const GameFooter = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const History = styled.div `
  padding: 25px 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
