import styled from 'styled-components';

export const div = styled.div`
   box-shadow: 0 0 1px 1px var(--spec-outlined-container);
   width: 100%;
   height: 400px;
   padding: 1rem;
   overflow-x: hidden;

   p {
      color: var(--main-cl);
   }

   .activeTab {
      background-color: var(--spec-button-chip-background-hover);
      border-radius: 7px;
   }

   .categorie_div {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      cursor: pointer;
      transition: all 0.2s ease;

      p {
         margin: 0;
         margin-left: 1rem;
      }

      svg {
         fill: var(--main-cl);
         font-size: 19px;
         margin-left: 1rem;
      }
   }
`;
