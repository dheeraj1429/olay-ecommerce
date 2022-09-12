import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   padding: 0.5rem 1rem;
   border-radius: 8px;
   height: ${(props) => (props.ShowDrop ? "auto" : "auto")};
   transition: all 0.3s ease;
   /* border: 1px solid var(--spec-10-percent-layer); */
   position: relative;
   margin: 0.2rem 0;
   border: 1px solid transparent;

   &:hover {
      border: 1px solid var(--icon-cl);
   }

   &:hover .drop-down-items {
      visibility: visible;
      opacity: 1;
      right: -210px;
   }

   svg {
      font-size: 16px;
      fill: var(--main-cl);
   }

   p {
      margin: 0;
      color: var(--main-cl);
   }

   .icons_text_div {
      display: flex;
   }

   .showDropDown-menu {
      opacity: 1;
      visibility: visible;
      right: -210px;
   }
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   cursor: pointer;
`;

export const iconDiv = styled.div`
   width: 25px;
   display: flex;
   align-items: center;
`;

export const dropDownItems = styled.div`
   width: 200px;
   /* background-color: var(--main-cl); */
   border-radius: 8px;
   right: -250px;
   margin-top: 0.5rem;
   opacity: 0;
   visibility: hidden;
   position: absolute;
   transition: all 0.3s ease;
   top: -10px;
`;
