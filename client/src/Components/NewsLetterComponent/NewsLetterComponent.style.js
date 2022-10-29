import styled from 'styled-components';

export const div = styled.div`
   padding: 2rem;
   border-top: 1px solid var(--spec-error-background);
   border-bottom: 1px solid var(--spec-error-background);

   .flex {
      display: flex;
      align-items: center;

      .half {
         width: 50%;
      }
   }

   h1 {
      margin-bottom: 0.3rem;
      font-size: 30px;
   }
`;
