import styled from "styled-components";

export const div = styled.div`
   display: flex;
   align-items: center;

   p {
      font-size: 12px;
   }
`;

export const user = styled.div`
   width: 40px;
   height: 40px;
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
