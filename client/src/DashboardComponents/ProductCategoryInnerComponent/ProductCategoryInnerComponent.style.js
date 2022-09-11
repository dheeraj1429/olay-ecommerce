import styled from "styled-components";

export const div = styled.div`
   padding: 0 1rem;
   margin: 1rem 0;

   img {
      width: auto;
      height: 20px;
   }

   svg {
      font-size: 18px;
      fill: var(--smooth-light-color);
   }

   h4 {
      font-size: 15px;
      margin: 0;
      margin-left: 1rem;
      color: var(--smooth-light-color);
      font-weight: 400;
   }
   p {
      font-size: 10px;
      margin: 0;
      color: var(--spec-white-color);
   }

   .Edit svg {
      cursor: pointer;
   }

   .margin_heading {
      padding-left: 1rem;
   }

   .img_div {
      display: flex;
      align-items: center;
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
