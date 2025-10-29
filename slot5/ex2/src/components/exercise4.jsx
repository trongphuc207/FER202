export function Exercise4() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  const first1 = ages[0];
  const isFirstEven = first1 % 2 === 0;
  const [first, , third = 0, ...restAges] = ages;
  const evenRest = restAges.filter(x => x % 2 === 0);
  const sumAges = ages.reduce((acc, age) => acc + age, 0);
  const sumAvrg = parseFloat((sumAges / ages.length).toFixed(2));

  return (
    <div>
      <h2>Exercise 4</h2>
      <p><strong>First element:</strong> {first1}</p>
      <p><strong>Is first even?</strong> {isFirstEven.toString()}</p>
      <p><strong>Destructuring →</strong> first = {first}, third = {third}</p>
      <p><strong>Rest ages:</strong> [{restAges.join(", ")}]</p>
      <ul>
        {evenRest.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
      <ul>
        {restAges.map((age,i)=><li key={i}>{age}</li>)}
      </ul>
      <p><strong>Sum of ages:</strong> {sumAges}</p>
      <p><strong>Average of ages:</strong> {sumAvrg}</p>
    </div>
  );
}   
export default Exercise4;
