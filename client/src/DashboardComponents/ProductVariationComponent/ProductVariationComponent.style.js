import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;

   .half-width {
      width: 100%;
      padding: 0 0.4rem 0 0;

      div {
         width: 100%;
      }
   }
`;

export const flex = styled.div`
   display: flex;
`;

export const tabsDiv = styled.div`
   width: 30%;
   padding: 0 1rem 0 0;
`;

export const renderDiv = styled.div`
   padding: 0 1rem;
   width: 80%;
`;

export const dropDown = styled.div`
   .heading_div {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
         cursor: pointer;
         font-size: 18px;
      }
      svg {
         cursor: pointer;
         fill: var(--smooth-light-color);
      }
   }
   .padding-div {
      padding: 1rem;
   }
   .drop_varient {
      width: 100%;
      border: 1px solid var(--icon-cl);
      border-radius: 8px;
      transition: all 0.5s ease;
      margin-bottom: 1rem;
      max-height: 60px;
      overflow: hidden;

      p {
         color: var(--smooth-light-heading-color);
         margin: 0;
      }

      ul {
         width: 100%;
      }

      ul li {
         list-style: none;
      }
   }

   .drop_varient_active {
      max-height: 900px;
      transition: all 0.5s ease;
   }
`;
