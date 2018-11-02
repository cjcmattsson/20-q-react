import styled from 'styled-components';

export const AllGameContainer = styled.div `
.parallax-bg {
    background-color: #FFE9DD;
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

export const AnswereGuessContainer = styled.div `
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswereButton = styled.div `
  height: 50px;
  border-radius: 50%;
  width: 50px;
  border: 2px solid ${props => props.yes ? "green" : "red"};
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
