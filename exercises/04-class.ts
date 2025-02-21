export class Human{
    name: string;
    age: number;
    birthdate: string;
    constructor(name: string, age:number,birthdate:string){
        this.name = name;
        this.age = age;
        this.birthdate = birthdate
    }
    sayAge(): number {
        return this.age
    }
    saySomething(words: string){
        return `${this.name}: ${words}`
    }
    sayMyName(){
        return this.name
    }
    sayNameAge(){
        return `${this.name}: ${this.age}, ${new Date(this.birthdate).toLocaleDateString()}`
    }
}

export const Yael = new Human('Yael',21,'2003-11-05')