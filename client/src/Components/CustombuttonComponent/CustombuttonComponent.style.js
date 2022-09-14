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
      transition: all 0.4s ease;
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
      transition: all 0.4s ease;
   }
   .Delete_btn:hover {
      background-color: var(--spec-static-brand-red);
   }
   .table_btn {
      background-color: transparent;
      margin-right: 1rem;

      svg {
         font-size: 17px;
      }
   }
   .pagination_btn {
      padding: 0.1rem 0.7rem;
      border-radius: 5px;
      margin: 0 0.5rem;
      transition: all 0.3s ease;

      svg {
         margin: 0;
      }
   }
   .PrevDisable_btn {
      padding: 0.1rem 0.7rem;
      border-radius: 5px;
      margin: 0 0.5rem;
      background-color: var(--spec-10-percent-layer);
      transition: all 0.3s ease;

      svg {
         fill: var(--main-cl);
      }
   }

   img {
      width: auto;
      height: 30px;
   }

   .margin-0 {
      padding: 0.5rem 3rem;
      margin: 0 !important;
   }

   .margin-rigth {
      padding: 0.5rem 3rem;
      margin: 0 !important;
      margin-right: 0.5rem !important;
   }
`;

export const button = styled.button`
   border: none;
   outline: none;
   cursor: pointer;
`;
