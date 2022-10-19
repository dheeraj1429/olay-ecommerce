import styled from 'styled-components';

export const div = styled.div`
   table {
      tr th {
         background-color: var(--spec-themed-blue);
         padding: 1rem 0.5rem;
      }

      /* .large-cl {
         width: 30%;
      }

      .sm-cl {
         width: 10%;
      } */

      /* .coutnry_div {
         width: 20%;
      } */

      tr td {
         padding: 0.7rem 0.5rem;
         background-color: var(--spec-background-cl);

         svg {
            cursor: pointer;
         }
      }

      .email {
         color: var(--spec-ad-indicator);
         cursor: pointer;
      }
   }
`;
