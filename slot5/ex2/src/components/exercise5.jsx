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
  const teens = people
  .filter(p=>p.age>=13 && p.age<=19)
  .map(p => `${p.name} có ${p.age} tuổi`);
  const sortedByName = [...people].sort((a,b)=>b.name.localeCompare(a.name));
   const secondPerson = people[1];
   const isSecondTeen = secondPerson.age >= 13 && secondPerson.age <= 19;
   const AgeMax=Math.max(...people.map(p=>p.age));
  return (
    <div>
      <h2>Exercise 5</h2>
      <h2>có {teens.length} người tuổi teen:</h2>
      <p>Nguoi so 2 : {secondPerson.name} - {secondPerson.age} tuổi</p>
      <p><strong>Số người tuổi teen:</strong> {teenCount}</p>
      <p><strong>Is second person a teen?</strong> {isSecondTeen.toString()}  </p>
      <p><strong>Người có tuổi cao nhất:</strong> {AgeMax}</p>
      <ul>
        {teensSortedByAge.map((p,i)=><li key={i}>{p.name} có {p.age} tuổi</li>)}
      </ul>
      <strong>Top 2 teen theo tên:</strong>
      <ul>
        {top2ByName.map((p,i)=><li key={i}>{p.name} - {p.age}</li>)}
      </ul>
      <ul>
        {sortedByName.map((people,i)=><li key={i}>{people.name} - {people.age}</li>)}</ul>
    </div>
  );
}   
export default Exercise5;

