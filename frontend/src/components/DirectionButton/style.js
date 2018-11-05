import styled from 'styled-components';

export const DirectionButtonContainer = styled.div `
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  img {
    height: 12px;
    width: 17px;

    :first-child {
      margin-right: 9px;
    }
    :last-child {
      margin-left: 9px;
    }
  }
`;
