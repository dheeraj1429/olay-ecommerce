import styled from "styled-components";

export const div = styled.div``;

export const tr = styled.tr`
   transition: all 0.2s ease;
   border-bottom: 1px solid transparent;

   &:hover {
      border-bottom: ${(props) => (props.variation ? "1px solid var(--icon-cl)" : null)};
      background-color: var(--spec-static-grey);
   }

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

   .Draft {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-suggested-action);
      color: var(--main-cl);
   }

   .Published {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--google-button-cl);
      color: var(--main-cl);
   }

   .Pending {
      padding: 0.2rem 2rem;
      width: max-content;
      border-radius: 5px;
      background-color: var(--spec-brand-link-text);
      color: var(--main-cl);
   }

   .produvt-variation-image-div {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;

      img {
         width: 100%;
         height: 100%;
      }
   }

   .padding_table td {
      padding: 0.9rem 1rem !important;
   }
`;

export const td = styled.td`
   padding: 0.9rem 0;
   font-size: 13px;
`;
