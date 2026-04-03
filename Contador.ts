class Contador {
    static total:number = 0;
    public nome:string;
    
    constructor(nome:string){
        this.nome = nome;
        Contador.total++;

    }

    static resetar() : void {
        Contador.total = 0;
    }
}