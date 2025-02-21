interface Human{
    name:string;
    age: number,
    birthdate: string;
    sayAge():number;
    saySomething(words: string): string;
    sayMyName(): string;
    sayNameAge(): string;
}

export class Person implements Human{ 
    name: string;
    age: number;
    birthdate: string;
    constructor(name: string, age:number,birthdate:string){
        this.name = name;
        this.age = age;
        this.birthdate = birthdate;
    }
    sayAge(): number {
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

export const Yael = new Person('Yael',21,'2003-11-05');