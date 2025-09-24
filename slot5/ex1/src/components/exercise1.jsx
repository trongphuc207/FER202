function Exercise1() {
    const hamDouble = x => x * 2;
    const isEven =  x => x % 2 === 0;
  return (
    <div>
        <h2>Exercise 1</h2>
     <p> double(7)= {hamDouble(7)} </p>
     <p> Check even number = {isEven(7).toString()}</p>
</div>
  );
}
export default Exercise1;
