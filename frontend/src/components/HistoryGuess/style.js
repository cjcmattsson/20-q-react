import styled from 'styled-components';

export const GuessContainer = styled.div `
  position: sticky;
  top: -1px;
  bottom: -1px;
  height: 71px;
  margin-bottom: 8px;
  border-radius: 4px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);

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
    color: white;
    display: flex;
    flex-direction: column;
    padding: 8px;

    p {margin: 0}

    .answere {
      font-family: "Manrope Semibold";
      font-size: 23px;

    }
    .number {
      font-family: "Manrope Light";
      font-size: 16px;
    }
  }

  .guessQuestion {
    text-align: left;
    padding: 12px 16px;
    flex: 1;
    height: 100%;
    border-radius: 0 4px 4px 0;
    background-color: white;
    margin: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
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
