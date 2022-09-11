import styled from "styled-components";

export const main = styled.div`
   a {
      text-decoration: none;
      color: var(--light-gray);
   }
   margin: 0.5rem 0;

   svg {
      font-size: 15px;
      fill: var(--light-gray);
   }
`;

export const div = styled.div`
   width: 100%;
   padding: 0.3rem 0.8rem;
   border-radius: 10px;
   cursor: pointer;
   background-color: ${(props) => (props.activeBar ? "var(--main-cl) !important" : null)};
   background-color: var(--spec-white-color);
   transition: all 0.3s ease;

   &:hover {
      background-color: var(--main-cl);
      transform: translateY(-2px);
   }
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
`;

export const iconDiv = styled.div`
   width: 30px;
   display: flex;
   align-items: center;
   justify-content: ${(props) => (props.isShow ? "center" : null)};
   transition: all 0.3s ease;
`;

export const contentDiv = styled.div`
   h5 {
      font-weight: 400;
      font-size: 15px;
      margin: 0;
   }
`;
