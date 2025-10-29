const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
const totalAges = ages.reduce((sum, age) => sum + age, 0);
console.log(totalAges);

const sumAges = ages.forEach(age => {
  totalAges += age;
});
console.log(totalAges);

const findMin = ages.reduce((min, age) => {
  return age < min ? age : min;
}, Infinity);
console.log(findMin);



const stats = ages.reduce(
  (acc, age) => {

    acc.total


    if (age < acc.min) acc.min = age;


    if (age > acc.max) acc.max = age;

    
    if (age >= 13 && age <= 19) {
      acc.buckets.teen++;   
    } else if (age >= 20) {
      acc.buckets.adult++;  
    }

    return acc; 
  },
  {
    total: 0,                  // tổng các số
    min: Infinity,             // khởi tạo min là vô cực
    max: -Infinity,            // khởi tạo max là âm vô cực
    buckets: { teen: 0, adult: 0 } // khởi tạo bộ đếm nhóm
  }
);

console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log("Buckets:", stats.buckets);

const result = {
    key: "value" + " with more text",
    total: stats.total,
    min: stats.min,
    max: stats.max,
    buckets: stats.buckets  
}
