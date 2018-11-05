import styled from 'styled-components';

export const NoLinkButtonContainer = styled.button `
  width: 100%;
  height: 61px;
  border-radius: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${props => props.color};
  text-transform: uppercase;
  font-size: 16px;
  border: none;
  font-family: "Manrope Semibold";
`;
