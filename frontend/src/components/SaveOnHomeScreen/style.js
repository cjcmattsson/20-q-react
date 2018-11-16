import styled from 'styled-components';

export const SaveOnHomeScreenContainer = styled.div `
  z-index: 100;
  position: relative;
  padding: 15px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  font-family: "Manrope Semibold";
  color: var(--text-grey);
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);

  h2, p {margin: 10px 0}

  h2 {font-size: 20px; margin-bottom: 5px}

  p {font-size: 14px;}

  p:last-child {
    font-size: 11px;
    margin-bottom: 5px;

    img {
      width: 15px;
      margin: 0 3px;
      transform: translateY(4px);
    }
  }
`;
