export function Exercise3() {
  // Bài 1: Arrow function cơ bản
  const double = (n) => n * 2;
  const isEven = (n) => n % 2 === 0;

  // Bài 2: Rest parameter – tính tổng và trung bình
  const sum = (...nums) => {
    return nums.filter(num => !isNaN(Number(num)))
               .reduce((acc, num) => acc + Number(num), 0);
  };

  const avg = (...nums) => {
    const validNums = nums.filter(num => !isNaN(Number(num))).map(Number);
    if (validNums.length === 0) return 0;
    return parseFloat((validNums.reduce((acc, num) => acc + num, 0) / validNums.length).toFixed(2));
  };

  // Bài 3: Destructuring
  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12"
    }
  };
  const { address: { street, city = "Unknown City" } } = person;

  return (
    <div>
      <h2>Exercise 3</h2>

      <h3>Bài 1: Arrow Functions</h3>
      <p>double(7) = {double(7)}</p>
      <p>Check even number (10) = {isEven(10).toString()}</p>
      <p>Check even number (7) = {isEven(7).toString()}</p>

      <h3>Bài 2: Rest Parameter</h3>
      <p>sum(1,2,3) = {sum(1, 2, 3)}</p>
      <p>sum(1,'x',4) = {sum(1, 'x', 4)}</p>
      <p>avg(1,2,3,4) = {avg(1, 2, 3, 4)}</p>
      <p>avg() = {avg()}</p>

      <h3>Bài 3: Destructuring</h3>
      <p>Street: {street}</p>
      <p>City: {city}</p>
    </div>
  );
}
