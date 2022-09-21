import styled from "styled-components";

export const div = styled.div`
   .center_div {
      width: 100%;
      text-align: center;

      p {
         font-size: 20px;
         color: var(--smooth-light-color);
      }
   }

   svg {
      cursor: pointer;
   }
`;

export const tableDiv = styled.div`
   padding: 1rem;
   overflow-x: auto;
   width: 100%;

   table {
      width: 100%;
   }

   table tr {
      text-align: left;

      th {
         font-size: 14px;
         color: var(--smooth-light-color);
         font-weight: 400;
         padding: 0.8rem 0;
      }

      td {
         padding: 0.8rem;
         color: var(--smooth-light-color);
      }
   }

   .Color-prv_div {
      width: 40px;
      height: 40px;
      border: 2px solid var(--main-cl);
      border-radius: 5px;
   }
`;
