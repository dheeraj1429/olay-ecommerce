import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   width: 40%;
   height: 420px;
   transition: all 0.2s ease;

   .cardDiv {
      width: 100%;
      height: 100%;
      padding: 1rem;
      box-shadow: 0 0 1px 1px var(--spec-outlined-container);
      border-radius: 8px;

      h5 {
         color: var(--main-cl);
         font-size: 20px;
      }

      .chart {
         width: 100%;
      }
   }
`;
