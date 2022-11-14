import styled from 'styled-components';

export const div = styled.div`
   .productname_section {
      width: 40%;
   }
   .icon_div {
      svg {
         font-size: 20px;
      }

      .inner_div {
         position: relative;

         .hover_div {
            top: -40px;
            left: -15px;
            position: absolute;
            transition: all 0.2s ease;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-10px);
         }

         &:hover .hover_div {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
         }
      }
   }
`;
