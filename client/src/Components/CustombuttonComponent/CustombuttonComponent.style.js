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
      padding: 0.3rem 3rem;
      border-radius: 5px;
      color: var(--main-cl);
      transition: all 0.3s ease;
      margin-top: 1rem;
   }
   .category_upload:hover {
      background-color: var(--spec-call-to-action-inverse);
   }
   .Delete_btn {
      padding: 0.3rem 3rem;
      margin-top: 1rem;
      margin-left: 1rem;
      background-color: var(--button-cl);
      color: var(--main-cl);
      border-radius: 5px;
      transition: all 0.3s ease;
   }
   .Delete_btn:hover {
      background-color: var(--spec-static-brand-red);
   }
`;

export const button = styled.button`
   border: none;
   outline: none;
   cursor: pointer;
`;
