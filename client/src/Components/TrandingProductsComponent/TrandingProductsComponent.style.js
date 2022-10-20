import styled from 'styled-components';

export const div = styled.div`
   padding-bottom: 2rem;

   .grid_div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
   }

   .center_div {
      width: 100%;
      display: flex;
      justify-content: center;
   }
`;
