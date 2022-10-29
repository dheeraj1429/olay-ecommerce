import styled from 'styled-components';

export const div = styled.div`
   width: 90%;

   .flex_div {
      height: 50px;
      display: flex;
      align-items: center;
   }

   input {
      width: 100%;
      height: 100%;
      padding: 1rem;
      border: 1px solid var(--spec-error-background);
   }

   .subHeading {
      font-size: 12px;
      margin-top: 0.2rem;
   }
`;
