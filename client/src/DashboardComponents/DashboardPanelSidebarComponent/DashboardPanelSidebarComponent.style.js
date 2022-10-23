import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--spec-background-gry-cl);
   width: ${(props) => (props.SmSidebar ? '6%' : '25%')};
   transition: all 0.3s ease;
   padding: 1rem;
   height: 100vh;
   overflow-x: hidden;

   .Margin_elm {
      margin-bottom: 1rem;
   }

   svg {
      cursor: pointer;
      fill: var(--main-cl);
   }

   h1 {
      font-size: 20px;
      color: var(--smooth-light-color);
   }
`;
