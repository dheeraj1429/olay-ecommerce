import styled from 'styled-components';

export const div = styled.div`
   .cart_items {
      width: 60%;
   }

   table {
      .light_table_tr {
         background-color: var(--light-cl);

         th {
            color: var(--dark-cl);
         }
      }

      tr {
         td {
            .product-cart-image-div {
               width: 70px;
               height: 70px;

               img {
                  width: 100%;
                  height: 100%;
               }
            }

            h5 {
               font-size: 12px;
               color: var(--spec-outlined-container);
            }

            h4 {
               font-size: 13px;
            }

            svg {
               cursor: pointer;
               fill: var(--dark-cl);
            }

            p {
               color: var(--dark-cl);
            }
         }
      }
   }
`;
