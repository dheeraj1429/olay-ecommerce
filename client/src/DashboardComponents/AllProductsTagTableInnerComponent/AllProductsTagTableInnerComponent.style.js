import styled from "styled-components";

export const tr = styled.tr`
   svg {
      cursor: pointer;
   }
   .status_td {
      width: 20%;
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

export const td = styled.td``;
