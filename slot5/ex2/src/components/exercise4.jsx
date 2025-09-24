export function Exercise4() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  const first1 = ages[0];
  const isFirstEven = first1 % 2 === 0;
  const [first, , third = 0, ...restAges] = ages;
  const evenRest = restAges.filter(x => x % 2 === 0);

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
    </div>
  );
}   
export default Exercise4;
