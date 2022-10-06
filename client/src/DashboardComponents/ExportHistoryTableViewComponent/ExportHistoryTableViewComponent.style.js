import styled from "styled-components";

export const div = styled.div`
   overflow-x: scroll;

   table {
      width: 1600px;
   }

   table tr {
      text-align: left;

      th {
         width: 1%;
         font-size: 14px;
         color: var(--smooth-light-color);
         font-weight: 400;
         padding: 0.8rem 0;
      }

      td {
         padding: 1rem 2rem 1rem 0;
         color: var(--smooth-light-color);
      }
   }
`;
