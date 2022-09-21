import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;

   p {
      color: var(--smooth-light-color);
      font-size: 15px;
   }
`;

export const tableView = styled.div`
   width: 100%;
   overflow-x: scroll;

   table {
      width: 1800px;
   }

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
`;
