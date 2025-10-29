const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
//lọc số đầu tiên là số chẵn
const first1 = ages[0];
const isEven = first1 % 2 == 0;
console.log(isEven);
const [first, , third = 0, ...restAges]= ages;
console.log(first);
console.log(third);
console.log(restAges);
//lọc số chẵn trong mảng còn lại restAges
const filterEven = restAges.filter(x => x % 2 == 0);
filterEven.forEach(x => console.log(x));