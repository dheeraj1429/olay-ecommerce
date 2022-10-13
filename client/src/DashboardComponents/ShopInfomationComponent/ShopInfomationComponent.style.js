import styled from 'styled-components';

export const div = styled.div`
   .Info {
      border-bottom: 1px solid var(--spec-outlined-container);
      margin-bottom: 1rem;
      width: 100%;

      .heading_div {
         margin-top: 2rem;
         width: 100%;
      }

      h5 {
         color: var(--smooth-light-color);
         font-size: 16px;
      }

      p {
         font-size: 14px;
         color: var(--smooth-light-color);
      }
   }
`;

export const spaceDiv = styled.div`
   padding: 1rem;
`;

export const formDiv = styled.div`
   padding: 1rem 0;
   width: 100%;
`;

export const flexDiv = styled.div`
   display: flex;
   width: 100%;
   align-items: center;

   div {
      width: 100%;
   }
`;

export const halfDiv = styled.div`
   width: 50%;
   padding-right: 0.5rem;
`;
