import styled from "styled-components";

export const parent = styled.div``;

export const div = styled.div`
   width: 100%;
   height: 150px;
   border: 1px solid var(--icon-cl);
   /* padding: 1rem; */
   border-radius: 5px;
   overflow-x: hidden;
   position: relative;

   .tag-container {
      width: 100%;
      padding: 0.8rem;
      border-radius: 5px;
   }

   .flex {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
   }

   .checkBox_items {
      font-size: 12px;
      margin-left: 1rem;
      color: var(--smooth-light-color);
      max-width: fit-content;
      padding: 0.3rem 1.4rem;
      border-radius: 30px;
      background-color: var(--smooth-light-heading-color);
      color: var(--spec-dark-background-color);
      margin: 0 0.5rem 0.6rem;
      cursor: pointer;
      transition: all 0.3s ease;
   }

   .checkBox_items_active {
      background-color: var(--spec-themed-green);
      color: var(--main-cl);
      transition: all 0.3s ease;
   }

   .Draft {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-suggested-action);
      color: var(--main-cl);
      font-size: 10px;
   }

   .Published {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
      font-size: 10px;
   }

   .Pending {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-brand-link-text);
      color: var(--main-cl);
      font-size: 10px;
   }

   .selected_tags {
      width: 100%;
      padding: 1rem;
      border: 1px solid var(--icon-cl);
      position: sticky;
      top: 0;
      left: 0;
      background-color: var(--main-cl);
      z-index: 100;
   }
`;
