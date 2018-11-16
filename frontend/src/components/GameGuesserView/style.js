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

const slideLeft = ({slide}) => {
  if (slide === true) return "slideLeft";
  else if (slide === false) return "nothing";
}

const scaleUpCard = ({scale}) => {
  if (scale === true) return "scaleUpCard";
  else if (scale === false) return "nothing";
}

export const AllGameContainer = styled.div `
  background-color: white;
  color: var(--text-grey);

.bg div:nth-child(2) svg g g path {
  z-index: 100;
  transform: scale(${blobSize});
  fill: ${blobColor};
  transition-property: transform,fill;
  transition-duration: 1s;
  transition-timing-function: ease;
}

.secondHidden {
  padding: 0 30px;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 200vw;
  justify-content: space-between;
}

@keyframes slideLeft {
  0% {transform: translateX(0);}
  50% {transform: translateX(-100vw);}
  51% {transform: translateX(100vw);}
  100% {transform: translateX(0);}
}

@keyframes scaleUpCard {
  0% {transform: scaleY(1)}
  30% {transform: scaleY(0.9)}
  60% {transform: scale(7);}
  100% {transform: scale(7);}
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
        font-family: "Manrope Semibold";
        transition: all 0.3s ease;

        span {
          font-family: "Manrope Light";
        }
      }
      .opponent {
        font-size: 16px;
      }
    }
  }
`;

export const GuessCardScaleWrapper = styled.div `
  height: 314px;
  width: 100%;
  max-width: 314px;
  background-color: transparent;
  animation-name: ${scaleUpCard};
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
`;

export const GuessCard = styled.div `
  transition: all 1s ease;
  background-color: white;
  animation-name: ${slideLeft};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

    &:placeholder {
      color: var(--light-grey);
    }

    &:focus {
      outline: none;
    }
  }

  .sendGuessWrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: row;

    .response {
      display: flex;
      flex-direction: row;
      align-items: center;

      @keyframes moveText {
        from {
          transform: translateX(25px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      p {
        color: black;
        font-size: 23px;
        font-family: "Manrope Semibold";
        transform: translateX(25px);
        opacity: 0;
        animation-name: moveText;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
    }

    .sendGuessButton {

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

    .waitingDots {
      font-family: "Manrope Semibold";
      font-size: 16px;
      :after {
        content: '.';
        animation: dots 2s steps(5, end) infinite;
        color: var(--light-grey);
      }
    }

    @keyframes dots {
    0%, 20% {
      color: rgba(0,0,0,0);
      text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    40% {
      color: var(--light-grey);
      text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    60% {
      text-shadow:
        .25em 0 0 var(--light-grey),
        .5em 0 0 rgba(0,0,0,0);}
    80%, 100% {
      text-shadow:
        .25em 0 0 var(--light-grey),
        .5em 0 0 var(--light-grey);}}

    .lastGuesser {
      height: 25px;
      width: 25px;
      margin-left: 10px;
      border-radius: 2px;
      background-position: center;
      background-size: cover;
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
  opacity: 0;
  padding: 47px;
  padding-top: 150px;
  animation-name: ${size};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;


@keyframes enlarge {
    0%   {opacity: 0;}
    100% {opacity: 1;}
}

@keyframes shrink {
    0%   {opacity: 1;}
    100% {opacity: 0;}
}

  h2 {
    font-size: 20px;
    margin: 0 0 16px;
    font-family: "Manrope Semibold";
    color: var(--text-grey);
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
    bottom: 25px;
    left: 25px;
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
  right: 35px;
  height: 50px;
  width: 50px;
  transition: all 0.5s ease;
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
