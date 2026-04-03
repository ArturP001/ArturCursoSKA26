export abstract class Funcionario{
    public nome:string = "";
    protected salario:number = 0;

    constructor(nome:string, salario:number){
        this.nome = nome;
        this.salario = salario;

    }

    abstract ferias(dias:number):string;

    abstract aumento(valor:number):string;

    falar(){
        console.log(`Meu nome é ${this.nome} \nE meu salerio é ${this.salario} \n`)
    }
    getSalario(){
        return this.salario;
    }
    setSalario(salarioValor:number){
        this.salario = salarioValor;

    }

    }