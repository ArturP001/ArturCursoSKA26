export class pessoa {
    nome:string = " ";
    sobrenome:string = " ";
    idade:number = 0 ;

    constructor(nome:string, sobrenome:string, idade:number){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.idade = idade;

    }
    
    falar(){
        console.log(`Meu nome é ${this.nome} ${this.sobrenome} \nE tenho ${this.idade} anos \n`);

    }
}
