import styled from 'styled-components';

export const HomeViewContainer = styled.div `
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
`;

export const ProfileTop = styled.div `
  height: 61px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 2px;

  .profilePic {
    height: 100%;
    width: 61px;
    background-color: salmon;
    border-radius: 2px;
  }

  .userNameAndStats {
    text-align: left;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 8px;

    h1 {
      font-size: 32px;
      margin: 0;
    }

    p {
      margin: 0;
      font-size: 16px;
    }
  }
`;

export const HomeGamesContainer = styled.div `
  margin-top: 32px;
  text-align: left;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
    text-transform: uppercase;
    font-size: 16px;
  }

  .gamesWrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const HomeButtonsWrapper = styled.div `
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 24px 0;
`;
