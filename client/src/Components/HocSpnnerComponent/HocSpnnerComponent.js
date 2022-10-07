import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";

const HocSpnnerComponent = function (OriginalComponent) {
   const newComponent = function ({ isLoading, spennerBlack, ...otherProps }) {
      return isLoading ? (
         <SpnnerComponent blackSpenner={spennerBlack} />
      ) : (
         <OriginalComponent {...otherProps} />
      );
   };

   return newComponent;
};

export default HocSpnnerComponent;
