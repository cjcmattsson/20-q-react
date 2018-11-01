import styled from 'styled-components';

const blobColor = ({answere}) => {
  if (answere == null) return "#FFE9DD";
  else if (answere == true) return "#3778FF";
  else if (answere == false) return "#FB7B7E";
}

const blobSize = ({answere}) => {
  if (answere == null) return "1";
  else if (answere == true || false) return "5";
}

export const AllGameContainer = styled.div `
.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 100%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: left;
}

.bg div svg g g path {
  transform: scale(${blobSize});
  fill: ${blobColor};
  transition-property: transform,fill;
  transition-duration: 1s;
  transition-timing-function: ease;
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
      border-radius: 2px;
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
  background-color: white;
  width: 100%;
  max-width: 314px;
  height: 314px;
  padding: 16px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);

  .guessInputField {
    width: 100%;
    height: 70%;
    font-size: 30px;
    text-align: left;
    padding: 0;
    border: none;

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
      background-color: hotpink;
    }
  }
`;

export const GuessWhoItIs = styled.div `
  color: white;
  width: 70%;
  height: 61px;
  border: 2px solid white;
  border-radius: 50px;
  background-color: rgba(255, 154, 158, 0.3);
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
