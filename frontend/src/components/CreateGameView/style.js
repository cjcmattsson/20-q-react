import styled from 'styled-components';

export const CreateGameContainer = styled.div `
  height: 100vh;
  width: 100vw;
  padding: 47px;
  padding-top: 170px;

  .searchField {
    height: 38px;
    width: 100%;
    font-size: 32px;

    :focus {
      outline: none;
    }
  }
`;

export const SearchResultWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SearchResult = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0 0;

  .profilePic {
    height: 38px;
    width: 38px;
    background-color: var(--soft-pink);
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
  bottom: 150px;
  right: 46px;
  height: 38px;
  width: 38px;
  background-color: salmon;
`;
