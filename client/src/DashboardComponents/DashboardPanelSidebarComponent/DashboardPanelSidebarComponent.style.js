import styled from "styled-components";

export const div = styled.div`
   background-color: var(--main-cl);
   width: ${(props) => (props.SmSidebar ? "6%" : "20%")};
   transition: all 0.3s ease;
   height: 100vh;
   overflow-x: hidden;
   padding: 1rem;

   .Margin_elm {
      margin-bottom: 1rem;
   }

   svg {
      cursor: pointer;
   }
`;
