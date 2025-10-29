const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 21 },
    { name: "Tom", age: 15 },
    { name: "Sue", age: 12 },
    { name: "Liz", age: 17 }
];

const teens = people
    .sort((a, b) => a.age - b.age)
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} có ${person.age} tuổi`);
// đếm có bao nhiêu người tuổi teen
console.log(`Có ${teens.length} người tuổi teen`);

const teenCount = people.filter(person => person.age >= 13 && person.age <= 19).length;
console.log(`Có ${teenCount} người tuổi teen`);

const teenCount2 = people.reduce((count, person) => {
    if (person.age >= 13 && person.age <= 19) {
        return count + 1;
    }
    return count;
}, 0);

console.log(`Có ${teenCount} người tuổi teen`);

teens.forEach(str => console.log(str));


people
    .filter(p => p.age >= 13 && p.age <= 19)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 2)
    .forEach(p => console.log(`${p.name} - ${p.age}`));     
    