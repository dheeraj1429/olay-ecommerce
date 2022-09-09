import styled from "styled-components";

export const div = styled.div`
   padding: 0 1rem;
   margin: 1rem 0;

   svg {
      font-size: 18px;
      fill: var(--spec-outlined-container);
   }

   h4 {
      font-size: 15px;
      margin: 0;
      margin-left: 1rem;
      color: var(--spec-outlined-container);
      font-weight: 400;
   }
   p {
      font-size: 12px;
      margin: 0;
      color: var(--spec-outlined-container);
   }

   .Edit svg {
      cursor: pointer;
   }

   .margin_heading {
      padding-left: 1rem;
   }
`;

export const flex = styled.div`
   display: flex;
`;

export const flexSpace = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;
