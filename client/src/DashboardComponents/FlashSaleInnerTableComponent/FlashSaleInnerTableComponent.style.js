import styled from 'styled-components';

export const div = styled.div`
   overflow-x: auto;
   width: 100%;

   table {
      width: 1400px;
   }

   p {
      margin: 0;
   }

   svg {
      cursor: pointer;
   }

   .center {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
         color: var(--smooth-light-color);
         font-size: 20px;
      }
   }

   .Close {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-brand-link-text);
      color: var(--main-cl);
   }

   .Open {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
   }
`;
