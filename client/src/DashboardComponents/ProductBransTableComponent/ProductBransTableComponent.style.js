import styled from 'styled-components';

export const div = styled.div`
   table {
      width: 100%;

      .icon {
         width: 40px;
         height: 40px;
         border-radius: 7px;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }

         .brand {
            width: 100%;
            height: 100%;
            background-color: var(--main-cl);
         }
      }
   }
`;

export const flexDiv = styled.div`
   display: flex;
   align-items: center;
`;
