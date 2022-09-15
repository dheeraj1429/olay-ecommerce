import styled from "styled-components";

export const div = styled.div``;

export const tr = styled.tr`
   .checkbox {
      padding-right: 0.6rem !important;
   }
   .product_image_prv {
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

   svg {
      cursor: pointer;
   }

   .no_sale {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-suggested-action);
      color: var(--main-cl);
   }
   .Sale {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-themed-green);
      color: var(--main-cl);
   }
   .On-backorder {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-themed-green);
      color: var(--main-cl);
   }
   .Out-of-stock {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-static-brand-red);
      color: var(--main-cl);
   }

   p {
      margin: 0;
   }
`;

export const td = styled.td`
   padding: 0.8rem 0 !important;

   font-size: 13px;
`;
