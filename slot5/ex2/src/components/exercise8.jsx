export function Exercise8() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const total = ages.reduce((sum,age)=>sum+age,0);
  const stats = ages.reduce((acc,age)=>{
    acc.total+=age;
    if(age<acc.min) acc.min=age;
    if(age>acc.max) acc.max=age;
    if(age>=13 && age<=19) acc.buckets.teen++;
    else if(age>=20) acc.buckets.adult++;
    return acc;
  },{total:0,min:Infinity,max:-Infinity,buckets:{teen:0,adult:0}});

  return (
    <div>
      <h2>Exercise 8</h2>
      <p>Total: {total}</p>
      <p>Min: {stats.min}, Max: {stats.max}</p>
      <p>Buckets → teen: {stats.buckets.teen}, adult: {stats.buckets.adult}</p>
    </div>
  );
}
export default Exercise8;