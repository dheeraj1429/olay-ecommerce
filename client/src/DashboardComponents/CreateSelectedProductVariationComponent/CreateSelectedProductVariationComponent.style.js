import styled from "styled-components";

export const div = styled.div`
   ul li {
      list-style: none;
   }

   p {
      color: var(--smooth-light-color);
   }
`;

export const spaceDiv = styled.div`
   padding: 1rem;
`;

export const flex = styled.div`
   display: flex;

   .half-width {
      width: 100%;
      padding: 0 1rem 0 0;

      div {
         width: 100%;
      }

      .color-swatches-prv-div {
         width: 30px;
         height: 30px;
         background-color: var(--main-cl);
      }
   }
`;

export const flexSpace = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
`;
