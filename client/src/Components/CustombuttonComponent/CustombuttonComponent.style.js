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
   .category_upload {
      background-color: var(--spec-general-background-a);
      padding: 0.6rem 3rem;
      border-radius: 30px;
      box-shadow: 0 0 50px 20px #e3e3e3;
      color: var(--main-cl);
      transition: all 0.3s ease;
   }
   .category_upload:hover {
      color: var(--spec-general-background-a);
      background-color: var(--main-cl);
   }
`;

export const button = styled.button`
   border: none;
   outline: none;
   cursor: pointer;
`;
