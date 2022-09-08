import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   padding: 0.8rem;
   border-radius: 10px;
   cursor: pointer;
   margin: 0.5rem 0;
   box-shadow: ${(props) => (props.activeBar ? "0 0 10px 1px #efefef" : null)};
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
      font-weight: 500;
   }
`;
