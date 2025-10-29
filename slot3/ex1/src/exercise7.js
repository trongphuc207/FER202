export function Exercise7() {
  // Spread operator
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 }
  ];

  const original = companies[0];
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Rest parameter
  const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
  const merged = concatAll([1, 2], [3], [], [4, 5]);

  return (
    <div>
      <h2>Exercise 7</h2>

      <div>
        <strong>Spread operator (clone + update):</strong>
        <p>Original: {original.name}, start = {original.start}, end = {original.end}</p>
        <p>Cloned &amp; Updated: {company0New.name}, start = {company0New.start}, end = {company0New.end}</p>
      </div>

      <div>
        <strong>Rest parameter (concatAll):</strong>
        <p>concatAll([1,2],[3],[],[4,5]) → [{merged.join(", ")}]</p>
      </div>
    </div>
  );
}
