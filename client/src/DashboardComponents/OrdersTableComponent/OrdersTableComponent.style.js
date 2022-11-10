import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   .center-div {
      text-align: center;

      p {
         font-size: 20px;
         color: var(--main-cl);
      }
   }

   .scroll_div {
      overflow-x: scroll;
   }

   .products_image_div {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background-color: var(--main-cl);
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
      }
   }

   table {
      width: 1600px;
   }

   .pending {
      width: max-content;
      padding: 0.2rem 0.8rem;
      background-color: var(--spec-brand-link-text);
      border-radius: 5px;
   }

   svg {
      cursor: pointer;
      font-size: 23px;
   }

   .hover_div_parent {
      position: relative;

      .hover_div {
         position: absolute;
         width: max-content;
         background-color: var(--spec-general-background-b);
         border-radius: 5px;
         padding: 0.2rem 0.8rem;
         top: -30px;
         right: -20px;
         visibility: hidden;
         opacity: 0;
         transition: all 0.1s ease;

         p {
            color: var(--main-cl);
            font-size: 13px;
            margin: 0;
         }
      }

      &:hover .hover_div {
         transform: translateY(-3px);
         visibility: visible;
         opacity: 1;
      }
   }
`;
