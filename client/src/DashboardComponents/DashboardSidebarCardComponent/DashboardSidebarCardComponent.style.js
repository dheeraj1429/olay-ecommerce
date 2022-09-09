import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   padding: 0.5rem 1rem;
   border-radius: 8px;
   height: ${(props) => (props.ShowDrop ? "auto" : "auto")};
   transition: all 0.3s ease;

   svg {
      font-size: 16px;
   }

   p {
      margin: 0;
   }

   .icons_text_div {
      display: flex;
   }

   .showDropDown-menu {
      opacity: 1;
      visibility: visible;
      display: block;
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
   margin-top: 0.5rem;
   opacity: 0;
   visibility: hidden;
   transition: opacity 1s ease-out;
   display: none;
`;
