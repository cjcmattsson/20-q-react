import styled from 'styled-components';

export const Container = styled.div `
.testThisShit {
  animation-name: slide-in;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  transition: all 1s ease;
}

@keyframes slide-in {
  from {
    transform: translateX(-200px);
    opacity: 0;

  }
    to {
      transform: translateX(0);
      opacity: 1;
    }
}

`;
