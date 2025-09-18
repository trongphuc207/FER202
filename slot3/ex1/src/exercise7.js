const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 }
];


const company0New = { ...companies[0], start: companies[0].start + 1 };

console.log(companies[0]);   
console.log(company0New);    


function concatAll(...arrays) {
    return [].concat(...arrays);
}

console.log(concatAll([1,2],[3],[4,5])); 