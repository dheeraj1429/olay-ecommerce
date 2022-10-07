import styled from "styled-components";

export const div = styled.div`
   overflow-x: scroll;

   table {
      width: 1200px;
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

   .icons_div {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30%;
      cursor: pointer;
      margin-right: 1rem;
      background-color: var(--smooth-light-color);
   }

   .flex_div {
      display: flex;
      align-items: center;
   }
`;

export const notification = styled.div`
   text-align: center;
   width: 100%;
   p {
      font-size: 20px;
      color: var(--smooth-light-color);
   }
`;
