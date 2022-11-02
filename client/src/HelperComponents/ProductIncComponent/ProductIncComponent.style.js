import styled from 'styled-components';

export const div = styled.div`
   .quntityDiv {
      width: 120px;
      height: 37px;
      box-shadow: 0 0 1px 1px var(--spec-outlined-container);
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .qtyBtn {
         width: 35%;
         cursor: pointer;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
      }

      svg {
         font-size: 17px;
      }

      p {
         margin: 0;
      }
   }
`;

export const flexDiv = styled.div`
   display: flex;
`;
