export class Professor{
    nome:string = "";
    idade:number = 0;
    disciplina:string = "";
    nota:number = 0.0;

    constructor(nome:string, idade:number, disciplina:string, nota:number ){
        this.nome = nome;
        this.idade = idade;
        this.disciplina = disciplina;
        this.nota = nota;
    }
    falar(){
        console.log(`Meu nome é ${this.nome} \nTenho ${this.idade} anos \nSou professor de ${this.disciplina} \nE sua nota é ${this.nota} \n`);

    }

}