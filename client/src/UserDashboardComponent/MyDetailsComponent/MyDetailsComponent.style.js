import styled from 'styled-components';

export const div = styled.div`
   h1 {
      font-size: 25px;
      margin: 0;
   }

   span {
      font-size: 13px;
   }

   .input_div {
      input {
         width: 100%;
         padding: 1rem;
         border: 1px solid #e1e1e1;
         border-radius: 5px;
      }
   }

   .information_div p {
      font-size: 13px;
      color: var(--spec-static-brand-black);
   }

   .error {
      color: var(--spec-static-brand-red) !important;
   }
`;
