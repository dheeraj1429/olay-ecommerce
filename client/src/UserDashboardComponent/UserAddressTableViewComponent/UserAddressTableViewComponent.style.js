import styled from 'styled-components';

export const div = styled.div`
   .address_view_div {
      width: 100%;
      padding: 0.8rem;
      border-radius: 5px;
      box-shadow: 0 0 10px 1px var(--smooth-light-heading-color);
      margin-bottom: 0.8rem;
   }

   .center_div {
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .scrollDiv {
      width: 100%;
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
