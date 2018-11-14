import styled from 'styled-components';

export const BackToHomeContainer = styled.div `
  height: 25px;
  width: 25px;

  a {
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;


    svg {
      background-position: center;
      background-size: contain;
      height: 100%;
      width: 100%;

      g path {
        transition: all 0.3s ease;
      }
    }
  }
`;
