import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   background-color: var(--spec-snackbar-background-updated);

   .image_with_content_div {
      position: relative;
   }

   .productName {
      max-width: 80%;
   }

   .sub {
      p {
         font-size: 15px;
         font-weight: 600;
         margin: 0;
      }

      span {
         color: var(--spec-static-brand-black);
         font-size: 13px;
      }
   }

   .product_image {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      overflow: hidden;

      .items_show {
         position: absolute;
         top: -10px;
         left: -10px;
         z-index: 10;
         background-color: var(--spec-static-brand-black);
         color: var(--main-cl);
         width: 25px;
         height: 25px;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }
`;
