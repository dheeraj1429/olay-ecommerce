import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 1rem 0;

   table {
      th {
         background-color: var(--spec-ad-indicator);
         color: var(--main-cl);
         text-align: center;
      }

      td {
         padding: 0.8rem 0.3rem;
         background-color: var(--spec-static-grey);
         text-align: center;
      }
   }
`;
