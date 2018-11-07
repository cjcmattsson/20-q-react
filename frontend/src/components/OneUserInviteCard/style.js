import styled from 'styled-components';

const bgColor = ({checked}) => {
  if (checked === false) return "white";
  else if (checked === true) return "var(--text-grey)";
}

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
      transition: all 0.3s ease;
      background-color: ${bgColor};
    }
  }
`
