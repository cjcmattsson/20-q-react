import styled from 'styled-components';

export const CreateGameContainer = styled.div `
  height: 100vh;
  width: 100vw;
  padding: 47px;
  padding-top: 150px;

  h2 {
    font-size: 24px;
    margin: 0 0 16px;
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
    bottom: 20px;
    left: 47px;
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
