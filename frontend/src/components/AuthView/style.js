import styled from 'styled-components';

export const AuthViewContainer = styled.div `
color: var(--text-grey);
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
}

.loginOrCreateUser {
  position: absolute;
  bottom: 20px;
  right: 20px;
  transition: all 1s ease;
}

`;

export const AuthHeader = styled.div `
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 0 30px;
  margin-top: 30px;
  margin-bottom: 45px;

  .blob {
    height: 51px;
    width: 51px;
    background-color: var(--strong-pink);
    border-radius: 50%;
  }
`;

export const WelcomeMessage = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 18px;
  justify-content: space-between;

  h2, p {margin: 0;}
  h2 {font-size: 23px;}
  p {font-size: 16px;}
`;

export const UserInfoContainer = styled.div `
  height: 300px;
  width: 100vw;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
`;

export const UserInputFields = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--light-grey);
    margin: 8px 0 16px;
    padding: 4px 0;
    font-weight: 500;
    background-color:transparent;
    font-size: 16px;

    :placeholder {
      color: var(--light-grey);
      font-size: 16px;
    }
    :focus {
      outline: none;
      font-size: 16px;
    }
  }

  label {
    font-weight: 500;
    height: 22px;
    font-size: 16px;
    text-transform: uppercase;
  }

  div p {
    text-align: right;
    font-weight: 500;
    font-size: 12px;
    margin-top: -10px;
  }
`;

export const RandomContentWrapper = styled.div `
  width: 100%;
  padding: 16px 30px;
  position: relative;
`;
