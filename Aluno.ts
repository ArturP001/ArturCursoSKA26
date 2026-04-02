export class Aluno{
    readonly nome:string = "";
    readonly idade:number = 0;
    public  disciplina:string = "";
    private nota:number = 0;

    constructor(nome:string, idade:number, disciplina:string, nota:number){
    this.nome = nome;
    this.idade = idade;
    this.disciplina = disciplina;
    this.nota = nota;

    }
    mudarNota(nota:number ){
        if(nota < 0 || nota > 10){
            console.log("Erro nota invalida");
            this.nota = 0;
        }else{
            this.nota = nota;
        }

    }

    falar(){
        console.log(`Meu nome é ${this.nome} \nTenho ${this.idade} anos \nMinha materia favirita é ${this.disciplina} \nE minha nota é ${this.nota} \n`);

    }
}