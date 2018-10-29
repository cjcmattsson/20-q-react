import styled from 'styled-components';

export const GuessContainer = styled.div `
  position: sticky;
  top: -1px;
  bottom: -1px;
  height: 71px;
  margin-bottom: 8px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.16);

.historyGuess {
  display: flex;
  flex-direction: row;
  z-index: 10;
  height: 100%;
  width: 100%;

  .guessNr {
    height: 100%;
    width: 71px;
    border-radius: 4px 0 0 4px;
  }

  .guessQuestion {
    text-align: left;
    padding: 12px;
    flex: 1;
    height: 100%;
    border-radius: 0 4px 4px 0;
    background-color: white;
    margin: 0;
  }
}

.sentinel {
  position: absolute;
  left: 0;
  right: 0;
  height: 25px;
  visibility: hidden;
}

.top {
  transform: translateY(-26px);
}
.bottom {
  transform: translateY(26px);
}
`;
