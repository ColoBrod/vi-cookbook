
@Surname('Lazarev')
class User {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    return `Hello! My name is ${this.name}. I am ${this.age} years old.`
  }
}

export default User;

function Surname(surname: string) {
  return function (constructor: Function) {
    console.log(constructor);
    constructor.prototype.surname = surname;
  }
}
