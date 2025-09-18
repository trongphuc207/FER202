const sum = (...nums) =>{
    const validNums = nums.filter(n => typeof n === 'number' && !isNaN(n));
    return validNums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1,2,3)); 
console.log(sum(1,'x',4));  

const avg =(...nums) =>{ 
    const validNums = nums.filter(n => typeof n === 'number' && !isNaN(n));
    if(validNums.length === 0 ) return 0;
    const average = validNums.reduce((acc, n) => acc + n, 0) / validNums.length;
    return Number(average.toFixed(2));

}
console.log(avg(1,2,3,4));
console.log(avg());