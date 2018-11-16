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

export const AllGameContainer = styled.div `
  color: var(--text-grey);
  background-color: white;

  .bg div:nth-child(2) svg g g path {
    z-index: 100;
    transform: scale(${blobSize});
    fill: ${blobColor};
    transition-property: transform,fill;
    transition-duration: 1s;
    transition-timing-function: ease;
  }

  .bg div {
    -webkit-transform: translateY(${props => props.slideValue/3}px);
    transform: translateY(${props => props.slideValue/3}px);
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
    max-width: 314px;
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
      transition: all 0.5s ease;

      p {
        margin: 0;
      }

      .guessNr {
        font-size: 32px;
        font-family: "Manrope Semibold";

        span {
          font-family: "Manrope Light";
        }
      .secretPerson {
        font-size: 16px;
      }
    }
  }
`;

const slideLeft = ({slide}) => {
  if (slide === true) return "slideLeft";
  else if (slide === false) return "nothing";
}

export const AnswereGuessContainer = styled.div `
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @keyframes slideLeft {
    0% {transform: translateX(0)}
    50% {transform: translateX(-100vw);}
    51% {transform: translateX(100vw);}
    100% {transform: translateX(0);}
  }

`;

export const AnswereButton = styled.div `
  height: 61px;
  width: 61px;
  border-radius: 50%;
  margin: 24px;
  transition: all 0.5s ease;
`;

export const CardSwiperArea = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 314px;
  animation-name: ${slideLeft};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  .swiper-container {
    overflow: visible;
    margin: 0;

    .swiper-wrapper {
      .swiper-slide {
        width: 314px;
      }
    }
  }

  @keyframes questionArrived {
    0% {transform: translateY(0)}
    50% {transform: translateY(-15px)}
    100% {transform: translateY(0)}
  }

`;

const questionInc = ({questionArrived}) => {
  if (questionArrived) return "questionArrived";
  else if (questionArrived === false) return "nothing";
}



export const IncomingGuessCard = styled.div `
  animation-name: ${questionInc};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  background-color: white;
  width: 100%;
  max-width: 314px;
  height: 314px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);

  .questionText, .questionTextWaiting {
    width: 100%;
    height: 70%;
    font-size: 32px;
    text-align: left;
    display: inline-block;
    padding: 16px 0;
    border: none;
  }

.questionTextWaiting {
  color: var(--light-grey);
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
`;

export const GuessCardHeader = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
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
      background-position: center;
      background-size: cover;
    }
  }
`;

const minifyWaiting = ({questionArrived}) => {
  if (questionArrived) return "minify";
  else if (questionArrived === false) return "nothing";
}

export const GuessCardFooter = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;

  @keyframes minify {
    from {transform: scale(1)}
    to {transform: scale(0)}
  }

  @keyframes moveText {
    from {
      transform: translateX(25px);
      opacity: 0;
    }
    to {
      transform: translateX(-5px);
      opacity: 1;
    }
  }
  @keyframes enlargeImage {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  .response {
    color: black;
    font-size: 23px;
    font-family: "Manrope Semibold";
    transform: translateX(25px);
    opacity: 0;
    animation-name: moveText;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  img {
    height: 38px;
    transform: scale(0);
    animation-name: enlargeImage;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

`;

export const WaitingAnim = styled.div `
  height: 100%;
  width: 50px;
  transform: scale(1);
  animation-name: ${minifyWaiting};
  animation-duration: 0.5s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`;


export const GameFooter = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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
