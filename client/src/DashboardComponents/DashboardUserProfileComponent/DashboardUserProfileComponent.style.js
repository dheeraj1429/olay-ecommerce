import styled from "styled-components";

export const div = styled.div`
   display: flex;
   align-items: center;

   p {
      font-size: 12px;
      margin: 0;
      color: var(--spec-white-color);
   }
`;

export const user = styled.div`
   width: 30px;
   height: 30px;
   border-radius: 50%;
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   cursor: pointer;
   margin-left: 1rem;
   overflow: hidden;

   img {
      width: 100%;
      height: 100%;
   }
`;
