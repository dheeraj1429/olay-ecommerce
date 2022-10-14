const UnitOfWeight = [
   { value: 'Gram (G)', label: 'Gram (G)' },
   { value: 'Kilogram (KG)', label: 'Kilogram (KG)' },
   { value: 'Pound (Lb)', label: 'Pound (Lb)' },
   { value: 'Ounce (OZ)', label: 'Ounce (OZ)' },
];

const UnitOfHeigthAr = [
   { value: 'Centimeter (CM)', label: 'Centimeter (CM)' },
   { value: 'Meter (M)', label: 'Meter (M)' },
   { value: 'Inch', label: 'Inch' },
];

const ThousandsSeparator = [
   { value: 'Comma (,)', label: 'Comma (,)' },
   { value: 'Period (.)', label: 'Period (.)' },
   { value: "Space (' ')", label: "Space (' ')" },
];

const tableTrAr = [
   { value: 'Name', key: 1 },
   { value: 'Symbol', key: 2 },
   { value: 'Number of decimals', key: 3 },
   { value: 'Exchange rate', key: 4 },
   { value: 'Position of symbol', key: 5 },
   { value: 'Is default', key: 6 },
   { value: 'Remove', key: 7 },
];

const positionData = [
   {
      value: 'Before number',
      label: 'Before number',
   },
   {
      value: 'After number',
      label: 'After number',
   },
];

export { UnitOfHeigthAr, UnitOfWeight, ThousandsSeparator, tableTrAr, positionData };
