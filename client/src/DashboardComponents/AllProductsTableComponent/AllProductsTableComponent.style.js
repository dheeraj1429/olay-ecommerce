import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;
`;

export const tableDiv = styled.div`
   overflow-x: auto;
   width: 100%;

   table {
      width: 1800px;
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
`;