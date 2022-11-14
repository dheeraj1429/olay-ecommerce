import styled from 'styled-components';

export const div = styled.div`
   .product_image_div {
      width: 200px;
      height: 200px;
      overflow: hidden;

      img {
         width: auto;
         height: 100%;
      }
   }
   .text {
      max-width: 90%;
      font-size: 20px;
      line-height: 30px;
   }

   .hover_text {
      transition: all 0.2s ease;
      &:hover {
         color: var(--spec-brand-link-text);
      }
   }
`;
