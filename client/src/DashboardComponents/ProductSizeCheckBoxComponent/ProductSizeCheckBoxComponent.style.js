import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 1rem;

   p {
      color: var(--main-cl);
      font-size: 18px;
      font-weight: 400;
   }
`;

export const mainDiv = styled.div`
   width: 300px;
   height: 200px;
   overflow: hidden;
   padding: 1rem;
   overflow: scroll;
   overflow-x: hidden;
   box-shadow: 0 0 1px 1px var(--spec-outlined-container);

   span {
      color: var(--main-cl);
   }
`;
