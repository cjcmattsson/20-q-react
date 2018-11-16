import styled from 'styled-components';

export const InvitePeopleToPlay = styled.div `
  background-color: white;
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

export const CreateGameContainer = styled.div `
  height: 100vh;
  width: 100vw;
  padding: 47px;
  padding-top: 150px;
  background-color: white;

  h2 {
    font-size: 20px;
    margin: 0 0 16px;
    font-family: "Manrope Semibold";
    color: var(--text-grey);
  }

  .searchField {
    height: 38px;
    width: 100%;
    font-size: 32px;
    border: none;
    padding-left: 0;
    margin-bottom: 12px;

    :focus {
      outline: none;
    }
  }

  .goBack {
    position: absolute;
    bottom: 25px;
    left: 25px;

    p {
      margin: 0;
    }
  }
`;

export const SearchResultWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
`;

export const SearchResult = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 0;
  animation: fadein 0.5s;

  .profilePic {
    height: 38px;
    width: 38px;
    background-position: center;
    background-size: contain;
    background-color: white;
  }

  p {
    font-size: 16px;
    margin: 0;
    padding-left: 8px;
    flex: 1;
    text-align: left;
    display: flex;
    align-items: center;
  }


`;

export const StarGameButton = styled.div `
  position: absolute;
  bottom: 25vh;
  right: 46px;
  height: 38px;
  width: 38px;

  img {
    height: 100%;
    width: 100%;
  }
`;
