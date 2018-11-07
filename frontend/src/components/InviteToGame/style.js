import styled from 'styled-components';

export const InvitePeopleToPlay = styled.div `
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 30px;

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
      transform: translateX(-700px);
      background-position: left;
    }
  }
`;

export const InvitePageHeader = styled.div `
  position: relative;
  height: 75px;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .topContent {
    display: flex;
    flex-direction: row;

    p {
      margin: 0;
      flex: 1;
      text-align: right;
      font-size: 16px;
    }
  }

  input {
    height: 35px;
    border: none;
    font-size: 16px;
    background-color: var(--input-bg);
    color: var(--text-grey);
    padding-left: 8px;

    :focus {
      outline: none;
    }
  }
`;

export const AllUsers = styled.div `
  z-index: 100;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  color: var(--text-grey);

  h2 {
    margin: 0;
    font-family: "Manrope Bold";
    font-size: 16px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
`;

export const OneUser = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  .userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    img {
      height: 38px;
      width: 38px;
      border-radius: 2px;
    }

    .name {
      margin: 0;
      margin-left: 8px;
      font-family: "Manrope Semibold";
      font-size: 16px;
    }
  }

  .selectUser {
    border: 2px solid var(--text-grey);
    border-radius: 50%;
    height: 23px; width: 23px;

    input {
      display: none;
    }

    .selected {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 1px solid white;
      transition: all 0.5s ease;
      background-color: ${props => props.selected ? "var(--text-grey)" : "white"};
    }
  }
`
