import styled from "styled-components";

export const div = styled.div`
   table {
      width: 100%;

      .icon {
         width: 40px;
         height: 40px;
         border-radius: 7px;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }

         .brand {
            width: 100%;
            height: 100%;
            background-color: var(--main-cl);
         }
      }
   }

   table tr {
      text-align: left;

      th {
         font-size: 13px;
         color: var(--smooth-light-color);
         font-weight: 400;
         padding: 0.8rem;
      }

      td {
         padding: 0.8rem;
         color: var(--smooth-light-color);
      }
   }

   .Draft {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-suggested-action);
      color: var(--main-cl);
   }

   .Published {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
   }

   .Pending {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-brand-link-text);
      color: var(--main-cl);
   }
`;

export const flexDiv = styled.div`
   display: flex;
   align-items: center;
`;
