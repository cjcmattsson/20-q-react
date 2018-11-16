import styled from 'styled-components';

export const PublicGamesViewContainer = styled.div `
  height: 100vh;
  width: 100vw;
  background-color: white;

`;
export const PublicGamesWrapper = styled.div `
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 30px;

  .listHeader {
    font-family: "Manrope Semibold";
    font-size: 16px;
    color: var(--text-grey);
    position: relative;
    margin: 16px 0 8px;
    text-transform: uppercase;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: left;

    div {
      width: 1000px!important;
      transform: translateX(-600px);
      background-position: left;
    }
  }
`;

export const PublicGamesHeader = styled.div `
position: relative;
height: 24px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;

a {
  color: var(--text-grey);
  text-decoration: none;

  p {
    margin: 0;
  }
}
`;

export const CreatePublicGameButton = styled.div `
  position: relative;
  width: 100%;
  height: auto;
  margin: 32px 0 0;
`;

export const GamesList = styled.div `
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;
