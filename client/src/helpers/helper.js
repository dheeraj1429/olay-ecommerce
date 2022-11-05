export const GetUrlValue = function (location) {
   const splitPath = location.pathname.split('/');
   const [first, ...second] = splitPath[splitPath.length - 1].split('-');
   const firstCaps = first.slice(0, 1).toUpperCase() + first.slice(1).toLowerCase();
   const result = [firstCaps, ...second].join(' ');
   return result;
};
