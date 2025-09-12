const result = (a,b) => a+b;
console.log(result(5,3));



let square = num => {
    return num*num;
}

console.log(square(5));
console.log(square(8));


let greet = (name, timeOfDay) => {
    console.log(`Good ${timeOfDay}, ${name}!`);
};

greet("Alice", "morning");
greet("Bob", "evening");

let sayHello = () => {
    console.log("Hello, World!");
};
sayHello();

let person = {
    name: "John",
    age: 30,
    greet: () => {
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }

};