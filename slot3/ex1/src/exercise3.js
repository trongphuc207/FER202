

const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

const {
    address:{
        street,
        city = "Unknown City"
    }
} = person;

console.log(street);
console.log(city);