import { Funcionario } from "./Funcionario.ts";

export class Gerente extends Funcionario {
    public cargo:string = "gerente";

    constructor(cargo:string, nome:string, salario:number){
        super(nome, salario);
        this.cargo = cargo;
    }

    //Implementação da Classe abstrata de Funcionario
    ferias(dias:number):string{
        if (dias > 40){
            return ("Erro, dias invalidos")
        }
        return `total de dias ${dias}`;
        
    }

    aumento(valor:number):string{
        if (valor > 10){
            return("hahahahahhahaahahahahahahaahha");
        }
        return `O seu aumento é de ${valor}`;
    }

    mandarAlguem(){
        console.log(`Quero um relatorio`)
    }
    // override sobreescreve o metodo falar do Funcionario
    override falar(){
        console.log(`Eu ganho mais do que você`);
    }

}