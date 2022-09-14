//======================================================
//
//  #####  ##  ##      ######  #####  #####     ####
//  ##     ##  ##        ##    ##     ##  ##   ##
//  #####  ##  ##        ##    #####  #####     ###
//  ##     ##  ##        ##    ##     ##  ##      ##
//  ##     ##  ######    ##    #####  ##   ##  ####
//
//======================================================

export const CampareFunction = function (filter, state) {
   let filterState;

   // |FILTER|: Sorting with a - z
   if (filter === "Sort A - Z") {
      filterState = state.brands.sort(function (a, b) {
         if (a.name > b.name) {
            return -1;
         } else {
            return 0;
         }
      });

      // |FILTER|: Sorting with z - a
   } else if (filter === "Sort Z - A") {
      filterState = state.brands.sort(function (a, b) {
         if (a.name < b.name) {
            return -1;
         } else {
            return 0;
         }
      });

      // |FILTER|: Sorting with order numbers
   } else if (filter === "Sort by order") {
      filterState = state.brands.sort((a, b) => {
         if (a.order > b.order) {
            return -1;
         } else if (a.order < b.order) {
            return 1;
         } else {
            return 0;
         }
      });

      // |FILTER|: published
   } else if (filter === "Published") {
      filterState = state.brands.sort((a, b) => {
         if (a.brandStatusInfo === "Published") {
            return -1;
         } else {
            return 0;
         }
      });
   }

   return filterState;
};
