import styled from 'styled-components';

export const HomeViewContainer = styled.div `
  background-color: white;
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
    background-color: white;
  }

  @keyframes menuOpen {
    from {
      top: 24px;
      left: 30px;
      height: 61px;
      width: 61px;
      z-index: 0;
      border-radius: 4px;
    }
    to {
      border-radius: 0;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1000;
    }
  }

  @keyframes menuClose {
    from {
      border-radius: 0;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1000;
    }
    to {
      border-radius: 4px;
      top: 24px;
      left: 30px;
      height: 61px;
      width: 61px;
      z-index: 0;

    }
  }
`;

const settingsSize = ({active}) => {
  if (active === null) return "null";
  else if (active === true) return "menuOpen";
  else if (active === false) return "menuClose";
}


export const Settings = styled.div `
  border-radius: 4px;
  animation-name: ${settingsSize};
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  position: absolute;
  top: 24px;
  left: 30px;
  z-index: 0;
  height: 61px;
  width: 61px;
  opacity: 0;
  transition: all 0.2s ease;
  background-position: center;
  background-size: cover;
  opacity: ${props => props.active ? 1 : 0};

  .overlay {
    border-radius: 4px;
    height: 100%;
    width: 100%;
    background-color: rgba(66, 66, 66, 0.55);
  }

  .settingsContent {
    padding: 24px 30px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.2s ease;
    opacity: ${props => props.active ? 1 : 0};

    p {
      margin: 0;
    }
  }
`;

export const SettingsHeader = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  a {
    color: white;
    text-decoration: none;
  }
`

export const SettingsTitle = styled.div `
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  margin: 12px 0;

  h2 {
    margin: 0;
    font-size: 28px;
    color: white;
    font-family: "Manrope Semibold";
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
