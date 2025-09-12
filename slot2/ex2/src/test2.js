const listInt = [1, 2, 3, 4, 5];
const listSquare = listInt.map(x => x * x);
console.log(listSquare);

listInt.filter(x => x % 2 === 0).forEach(x => console.log(x));
 const sum = listInt.reduce((acc, val) => acc + val, 0);
 console.log(sum);

 let people = [    
     { id : 1,  name: "John", age: 20 },
     { id : 2,  name: "Alice", age: 25 },
     { id : 3,  name: "Bob", age: 30 },
     { id : 4,  name: "Charlie", age: 35 }
 ];

  people.forEach(p => console.log(`${p.name} is ${p.age} years old.`));
  console.log(people.sort((a, b) => a.age - b.age));

 console.log(people.filter(p => p.age > 20).map(p => p.name));

    let totalAge = people.reduce((sum, p) => sum + p.age, 0);
    console.log(totalAge);
 

