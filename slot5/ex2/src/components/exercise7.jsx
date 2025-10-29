export function Exercise7() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 }
  ];

  const original = companies[0];
  const company0New = { ...original, start: original.start + 1 };

  const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
  const merged = concatAll([1, 2], [3], [], [4, 5]);

  return (
    <div>
      <h2>Exercise 7</h2>

      <p><strong>Original:</strong> {original.name}, start = {original.start}</p>
      <p><strong>Cloned &amp; Updated:</strong> {company0New.name}, start = {company0New.start}</p>

      <p>concatAll([1,2],[3],[],[4,5]) → [{merged.join(", ")}]</p>
    </div>
  );
}
export default Exercise7;