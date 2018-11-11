import styled from 'styled-components';

export const AllGameContainer = styled.div `
  color: var(--text-grey);
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
      .secretPerson {
        font-size: 16px;
      }
    }
  }
`;

export const AnswereGuessContainer = styled.div `
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswereButton = styled.div `
  height: 61px;
  width: 61px;
  border-radius: 50%;
  margin: 24px;
  border: 2px solid ${props => props.yes ? "var(--victory-blue)" : "var(--error-red)"};
  transition: all 0.5s ease;
`;

export const IncomingGuessCard = styled.div `
  background-color: white;
  width: 100%;
  max-width: 314px;
  height: 314px;
  padding: 15px;
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
    content: ' .';
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
      background-color: var(--strong-pink);
    }
  }
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
