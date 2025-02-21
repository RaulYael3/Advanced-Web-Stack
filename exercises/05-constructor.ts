interface Human{
    name:string;
    age: string,
    birthdate: string;
    sayAge():string;
    saySomething(words: string): string;
    sayMyName(): string;
    sayNameAge(): string;
}

export class Zombie implements Human{
    name: string;
    age: string;
    birthdate: string;
    constructor(){
        this.name = 'agagra';
        this.age = 'acriia';
        this.birthdate = 'barennaq';
    }
    sayAge(): string {
        return this.age;
    }
    saySomething(words: string){
        return `${this.name}: ${words}`;
    }
    sayMyName(): string{
        return this.name;
    }
    sayNameAge(): string{
        return `${this.name}: ${this.age}`;
    }
}

function Infected(){
    return (target: Function) => {
        return Zombie
    }
}

@Infected()
export class Person implements Human{ 
    name: string;
    age: string;
    birthdate: string;
    constructor(name: string, age:string,birthdate:string){
        this.name = name;
        this.age = age;
        this.birthdate = birthdate;
    }
    sayAge(): string {
        return this.age;
    }
    saySomething(words: string){
        return `${this.name}: ${words}`;
    }
    sayMyName(): string{
        return this.name;
    }
    sayNameAge(): string{
        return `${this.name}: ${this.age}, ${new Date(this.birthdate).toLocaleDateString()}`;
    }
}

export const Yael = new Person('Yael','21','2003-11-05');