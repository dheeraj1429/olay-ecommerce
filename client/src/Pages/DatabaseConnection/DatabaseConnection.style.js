import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`;

export const mainDiv = styled.div`
   width: 68%;
   padding: 1.5rem 2rem;
   border-radius: 8px;
   box-shadow: 0 0 10px 1px #e1e1e1;
   background-color: var(--spec-background-gry-cl);

   .headingPara {
      margin-bottom: 2rem;
      font-weight: 400;
      font-size: 17px;
   }

   p {
      color: var(--smooth-light-color);
      margin: 0;
      font-weight: 300;
      font-size: 13px;
   }
`;
