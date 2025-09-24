export function Exercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 21 },
    { name: "Tom", age: 15 },
    { name: "Sue", age: 12 },
    { name: "Liz", age: 17 }
  ];

  const teensSortedByAge = [...people].sort((a,b)=>a.age-b.age).filter(p=>p.age>=13 && p.age<=19);
  const teenCount = teensSortedByAge.length;

  const top2ByName = people.filter(p=>p.age>=13 && p.age<=19)
                           .sort((a,b)=>a.name.localeCompare(b.name))
                           .slice(0,2);

  return (
    <div>
      <h2>Exercise 5</h2>
      <p><strong>Số người tuổi teen:</strong> {teenCount}</p>
      <ul>
        {teensSortedByAge.map((p,i)=><li key={i}>{p.name} có {p.age} tuổi</li>)}
      </ul>
      <strong>Top 2 teen theo tên:</strong>
      <ul>
        {top2ByName.map((p,i)=><li key={i}>{p.name} - {p.age}</li>)}
      </ul>
    </div>
  );
}   
export default Exercise5;

