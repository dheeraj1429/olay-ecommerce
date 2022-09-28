import styled from "styled-components";

export const div = styled.div`
   position: absolute;
   top: 70px;
   left: 0;
   width: 100%;
   background-color: var(--spec-static-grey);
   border-radius: 7px;
   transition: all 0.1s ease;
   opacity: ${(props) => (props.show ? 1 : 0)};
   visibility: ${(props) => (props.show ? "visible" : "hidden")};
   overflow: hidden;
   z-index: 200;
   border: 1px solid var(--spec-static-brand-black);

   .productListCard {
      width: "100%";
      padding: 1rem;
      border-bottom: 1px solid var(--icon-cl);
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
         background-color: var(--icon-cl);
      }
   }

   .ProductImage {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 1rem;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .ProductInfo {
      p {
         margin: 0;
         font-size: 12px;
         color: var(--main-cl);
      }
   }

   .center-div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
   }
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
`;

export const space = styled.div`
   padding: 0 1rem;
`;
