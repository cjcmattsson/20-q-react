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

  .guessWhoItIs {
    width: 100%;
    max-width: 314px;
  }
`;

export const GameHeader = styled.div `
    width: 100%;
    max-width: 314px;
    height: 61px;
    display: flex;
    flex-direction: row;

    .blurredImage {
      height: 61px;
      width: 61px;
      border-radius: 4px 0 0 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-position: center;

      canvas {
        border-radius: 4px;
        height: 100%;
        width: 100%
      }
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
  transition: all 1s ease;
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

const size = ({sizeOfCard}) => {
  if (sizeOfCard === false) return "enlarge";
  else if (sizeOfCard === true) return "shrink";
}

export const GuessWhoItIsContainer = styled.div `
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  padding: 47px;
  padding-top: 150px;
  animation-name: ${size};
  animation-duration: 1s;

@keyframes enlarge {
    0%   {opacity: 0;}
    100% {opacity: 1;}
}

@keyframes shrink {
    0%   {opacity: 1;}
    100% {opacity: 0;}
}

  h2 {
    font-size: 24px;
    margin: 0 0 16px;
  }

  .secretPerson {
    height: 38px;
    width: 100%;
    font-size: 32px;
    border: none;
    padding-left: 0;
    margin-bottom: 12px;

    :focus {
      outline: none;
    }
  }

  .goBack {
    position: absolute;
    bottom: 20px;
    left: 47px;
    transition: all 0.5s ease;
  }
`;

export const SearchResultWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
`;

export const SearchResult = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 0;
  animation: fadein 0.5s;

  .profilePic {
    height: 38px;
    width: 38px;
    background-position: center;
    background-size: contain;
    background-color: white;
  }

  p {
    font-size: 16px;
    margin: 0;
    padding-left: 8px;
    flex: 1;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .cancelGuess {
    transition: all 0.5s ease;
  }


`;

export const SendFinalGuess = styled.div `
  position: absolute;
  bottom: 31.8vh;
  right: 46px;
  height: 38px;
  width: 38px;
  transition: all 0.5s ease;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const FinalGuessResultWrapper = styled.div `
  height: 100vh;
  width: 100vw;
  padding: 25px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .goHome {
    position: absolute;
    bottom: 25px;
    right: 25px;
    fill: white;
    animation-name: showHome;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-delay: 3s;
    opacity: 0;
    pointer-events: none;
  }

  @keyframes slideInResult {
    from {transform: translateX(100vw)}
      to {transform: translateX(0)}
  }

  @keyframes showHome {
    from {opacity: 0; pointer-events: none;}
      to {opacity: 1; pointer-events: auto;}
  }

  @keyframes widenButton {
    from {width: 0; }
      to {width: 100%;}
  }

  @keyframes fadeInText {
    from {opacity: 0; }
      to {opacity: 1;}
  }
`;


export const FinalGuessContent = styled.div `
  transform: translateX(100vw);
  width: 100%;
  animation-name: slideInResult;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-delay: 2.3s;

  .playAgainButton {
    width: 100%;
    height: 61px;
    border-radius: 31px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-transform: uppercase;
    border: none;
    font-family: "Manrope Semibold";

    p {
      position: absolute;
      margin: auto;
      z-index: 10;
      animation-name: fadeInText;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-delay: 4.5s;
      opacity: 0;
    }
  }

  p {
    color: white;
    font-family: "Manrope Semibold";
    font-size: 16px;
    margin: 8px 0 24px;
  }

  p:first-child {
    text-transform: uppercase;
    margin-bottom: 8px;
  }


  .image {
    width: 100%;
    height: 314px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 4px;
  }

`;

export const PlayAgainButton = styled.div `
  position: absolute;
  z-index: 0;
  left: 0;
  width: 0;
  animation-name: widenButton;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-delay: 5s;
  height: 61px;
  border-radius: 31px;
  background-color: ${props => props.color};
  text-transform: uppercase;
  border: none;
  font-family: "Manrope Semibold";

  :focus, :active {
    outline: none;
  }
`
