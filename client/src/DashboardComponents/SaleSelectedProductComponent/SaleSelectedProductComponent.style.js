import styled from "styled-components";

export const fullView = styled.div`
   width: 50%;

   .flex {
      width: 100%;
      display: flex;

      div {
         width: 100%;
      }
   }
`;

export const flex = styled.div`
   display: felx;
   align-items: center;

   .closeButton_div {
      padding: 0 1rem;

      svg {
         cursor: pointer;
         fill: var(--smooth-light-color);
      }
   }
`;

export const spaceDiv = styled.div`
   padding: 1rem 0;
`;

export const spaceDivleft = styled.div`
   padding-left: 1rem;
`;
