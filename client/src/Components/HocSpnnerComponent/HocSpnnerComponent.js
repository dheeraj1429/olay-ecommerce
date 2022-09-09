import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";

const HocSpnnerComponent = function (OriginalComponent) {
   const newComponent = function ({ isLoading, ...otherProps }) {
      return isLoading ? <SpnnerComponent /> : <OriginalComponent {...otherProps} />;
   };

   return newComponent;
};

export default HocSpnnerComponent;
