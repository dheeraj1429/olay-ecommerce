import styled from 'styled-components';

export const div = styled.div`
   .User_info_div {
      width: 100%;
      padding: 1rem;
      border-radius: 5px;

      p {
         margin: 0;
      }

      .radioFrom {
         p {
            margin-left: 0.5rem;
         }
      }

      .section_div {
         .sapceDiv {
            width: 150px;
         }

         h5 {
            margin: 0;
            font-size: 15px;
         }
         p {
            margin: 0;
            color: var(--spec-static-brand-black);
         }
         span {
            color: var(--spec-ad-indicator);
         }
      }
   }
`;
