import styled from "styled-components";

export const div = styled.div`
   overflow-x: auto;
   width: 100%;

   svg {
      cursor: pointer;
   }

   .center {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
         color: var(--smooth-light-color);
         font-size: 20px;
      }
   }

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
         padding: 0.8rem 0;
         color: var(--smooth-light-color);
      }
   }
`;
