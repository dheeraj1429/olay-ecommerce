import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   .overflow_div {
      width: 100%;
      overflow-x: scroll;
   }

   table {
      width: 1300px;

      tr td {
         font-size: 12px;
      }
   }

   .flex {
      display: flex;
      align-items: center;
   }

   .ms-2 {
      margin-right: 0.3rem;
   }

   .ImageDiv {
      width: 50px;
      height: 50px;
      background-color: var(--main-cl);
      border-radius: 5px;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
      }
   }

   svg {
      cursor: pointer;
   }

   .center_Div {
      width: 100%;
      text-align: center;

      p {
         font-size: 25px;
         color: var(--main-cl);
      }
   }
`;
