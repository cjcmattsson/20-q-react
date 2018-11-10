import styled from 'styled-components';

export const HomeViewContainer = styled.div `
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;

  .logout {
    position: relative;
  }

  .bg {
    height: 130%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const ProfileTop = styled.div `
  position: relative;
  height: 61px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 2px;

  .profilePic {
    height: 100%;
    width: 61px;
    border-radius: 2px;
    background-position: center;
    background-size: cover;
  }

  .userNameAndStats {
    text-align: left;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 8px;
    font-family: "Manrope Semibold";
    color: var(--text-grey);


    h1 {
      font-size: 28px;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }

    p {
      margin: 0;
      font-size: 16px;
    }
  }
`;

export const HomeGamesContainer = styled.div `
  position: relative;
  margin-top: 32px;
  text-align: left;
  display: flex;
  flex-direction: column;

  h2 {
    font-family: "Manrope Semibold";
    color: var(--text-grey);
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
  position: relative;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 24px 0;
`;
