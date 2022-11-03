import styled from 'styled-components';

export const div = styled.div`
   .image_prev_div {
      width: 40%;
      padding: 1rem;

      img {
         width: auto;
         height: 400px;
      }
   }

   .salePrice {
      font-size: 13px;
      color: var(--spec-text-disabled);
   }

   .text-red {
      color: var(--spec-static-brand-red);
   }

   .product_content_div {
      width: 60%;
      padding: 0 1rem;

      h1 {
         font-size: 22px;
         line-height: 33px;
         margin: 0;
         color: var(--dark-cl);
      }

      .choise_tag_div {
         background-color: var(--spec-background-cl);
         padding: 0 0.8rem;
         color: var(--main-cl);
         width: max-content;
      }

      .price {
         font-size: 13px;
         color: var(--spec-static-brand-black);

         span {
            margin-left: 0.2rem;
            font-size: 20px;
            color: var(--spec-static-brand-dark);
         }
      }
   }

   .product_details_div {
      h5 {
         font-size: 18px;
         font-weight: 600;
      }
   }

   .product_details_content_div {
      .space_div {
         width: 200px;
      }

      p {
         margin: 0;
         font-size: 13px;
      }
   }

   .content {
      outline: none;
   }
`;

export const flexDiv = styled.div`
   display: flex;

   .quntityGrDiv {
      span {
         font-size: 12px;
         color: var(--spec-static-brand-black);
      }
   }

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

   .wishList {
      svg {
         font-size: 22px;
         cursor: pointer;
      }
   }
`;
