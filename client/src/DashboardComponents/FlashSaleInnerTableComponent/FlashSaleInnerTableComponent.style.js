import styled from 'styled-components';

export const div = styled.div`
   overflow-x: auto;
   width: 100%;

   svg {
      cursor: pointer;
   }

   .center {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
         color: var(--smooth-light-color);
         font-size: 20px;
      }
   }
`;
