const filterFunction = function (objectFilterFilde, state, filde, returnValue = undefined) {
   let filterFN = state[filde].sort(function (a, b) {
      if (!!returnValue && a[objectFilterFilde] < b[objectFilterFilde]) {
         return -1;
      } else {
         if (a[objectFilterFilde] > b[objectFilterFilde]) {
            return -1;
         } else {
            return 0;
         }
      }
   });

   return filterFN;
};

const filterByName = function (name, state, objectFilterFilde, filde) {
   let filter = state[filde].sort(function (a, b) {
      if (a[objectFilterFilde] == name) {
         return -1;
      } else {
         return 0;
      }
   });

   return filter;
};

export const CampareFunction = function (filter, state, filde) {
   let filterState;

   if (filter === "Sort A - Z") {
      filterState = filterFunction("name", state, filde);
   } else if (filter === "Sort Z - A") {
      filterState = filterFunction("name", state, filde, 1);
   } else if (filter === "Sort by order") {
      filterState = filterFunction("order", state, filde);
   } else if (filter === "Published") {
      if (filde === "brands") {
         filterState = filterByName(filter, state, "brandStatusInfo", filde);
      } else if (filde === "products") {
         filterState = filterByName("Published", state, "productStatusInfo", filde);
      } else if (filde === "tags") {
         filterState = filterByName("Published", state, "status", filde);
      } else if (filde === "sales") {
         filterState = filterByName("Published", state, "statusInfo", filde);
      }
   } else if (filter === "Out of stock") {
      filterState = filterByName(filter, state, "stockStatus", filde);
   }

   return filterState;
};
