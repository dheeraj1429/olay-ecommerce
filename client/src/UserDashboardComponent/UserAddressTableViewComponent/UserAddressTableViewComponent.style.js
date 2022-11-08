import styled from 'styled-components';

export const div = styled.div`
   .address_view_div {
      width: 100%;
      padding: 0.8rem;
      border-radius: 5px;
      box-shadow: 0 0 10px 1px var(--smooth-light-heading-color);
      margin-bottom: 0.8rem;
   }

   .scrollDiv {
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
   }

   .table_view_Div {
      width: 1400px;
   }

   p {
      margin: 0;
   }

   table {
      tr th {
         color: var(--spec-background-cl);
      }

      tr td {
         color: var(--spec-background-cl);
      }
   }

   svg {
      cursor: pointer;
      fill: var(--dark-cl);
      font-size: 20px;
   }
`;
