import styled from "styled-components";

export const div = styled.div`
   .admin-signin {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
      margin-top: 1rem;
      transition: all 0.3s ease;
   }
   .admin-signin:hover {
      background-color: var(--spec-base-background);
   }
`;

export const button = styled.button`
   border: none;
   outline: none;
   cursor: pointer;
`;
