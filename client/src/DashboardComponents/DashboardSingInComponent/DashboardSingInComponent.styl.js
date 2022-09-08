import styled from "styled-components";

export const div = styled.div`
   width: 80%;
   margin: auto;
   padding: 1rem;
   border-radius: 10px;
   background-color: var(--main-cl);

   .Loding {
      width: 100%;
      display: flex;
      align-items: center;

      img {
         width: 100%;
         height: 30px;
      }
   }

   h1 {
      font-size: 60px;
      font-weight: 400;
   }

   h4 {
      font-weight: 300;
      color: var(--button-cl);
      font-size: 12px;
   }

   p {
      color: var(--gray-cl);
      font-size: 15px;
      margin-bottom: 1rem;
   }
`;
