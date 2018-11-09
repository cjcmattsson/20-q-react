import styled from 'styled-components';

const blobColor = ({answere}) => {
  if (answere === null) return "var(--soft-pink)";
  else if (answere === true) return "var(--victory-blue)";
  else if (answere === false) return "var(--error-red)";
}

const blobSize = ({answere}) => {
  if (answere === null) return "1";
  else if (answere === true || answere === false) return "5";
}

const moveCard = ({answere}) => {
  if (answere === null) return "nothing";
  else if (answere === true) return "correct";
  else if (answere === false) return "wrong";
}

export const AllGameContainer = styled.div `
  color: var(--text-grey);

.bg div:nth-child(2) svg g g path {
  z-index: 100;
  transform: scale(${blobSize});
  fill: ${blobColor};
  transition-property: transform,fill;
  transition-duration: 1s;
  transition-timing-function: ease;
}

@keyframes correct {
    0% {transform: translateY(0)}
    50% {transform: translateY(-20px)}
    100% {transform: translateY(0)}
}
@keyframes wrong {
    0% {transform: translateY(0)}
    50% {transform: translateY(20px)}
    100% {transform: translateY(0)}
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
      background-color: var(--strong-pink);
      border-radius: 2px;
      background-position: center;
      background-size: cover;
    }

    .headerText {
      padding-left: 10px;
      text-align: left;

      p {
        margin: 0;
      }

      .guessNr {
        font-size: 32px;
      }
      .opponent {
        font-size: 16px;
      }
    }
  }
`;

export const GuessCard = styled.div `
  animation: ${moveCard} 1s linear;
  background-color: white;
  width: 100%;
  max-width: 314px;
  height: 314px;
  padding: 16px;
  border-radius: 4px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);

  .guessInputField {
    width: 100%;
    height: 70%;
    font-size: 32px;
    text-align: left;
    display: inline-block;
    padding: 16px 0;
    color: var(--text-grey);
    border: none;
    font-family: 'Roboto', sans-serif;

    &:focus {
      outline: none;
    }
  }

  .sendGuessWrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    .sendGuessButton {
      transform: translateY(7px) translateX(5px);
      height: 50px;
      width: 50px;
    }
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
      border-radius: 2px;
      background-color: var(--strong-pink);
    }
  }
`;

export const GuessWhoItIs = styled.div `
  color: white;
  width: 70%;
  height: 61px;
  border-radius: 50px;
  background-color: var(--strong-pink);
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
  font-size: 16px;
  align-items: flex-end;

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    img {
      height: 12px;
      width: 17px;
      margin-right: 5px;
    }
  }
`;

export const History = styled.div `
  padding: 0 0 25px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .historyFooter {
    margin: 0 25px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    p {
      margin: 0;
    }
  }
`;
