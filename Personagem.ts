export abstract class Personagem{
    public nome: string = "personagem";
    protected forca: number = 0;
    protected HP: number = 0;
    protected cura: number = 0;
    private jaCurou: boolean = false;
    protected defesa: number = 0;

    constructor(nome:string, forca:number, HP:number, cura:number, defesa:number){
        this.nome = nome;
        this.forca = forca;
        this.HP = HP;
        this.cura = cura;
        this.defesa = defesa;

    }

    isVivo():boolean {
        return this.HP > 0;

    }

    sofrerAtaque(dano:number):void {
        let danoReal = dano - (dano * (this.defesa / 100));

        this.HP = this.HP - danoReal;

        console.log(`${this.nome} recebeu ${danoReal} de dano. Vida atual: ${this.HP}`);

    }

    gerarAtaque():number{
        let maximoAtk = 3;

        return Math.floor(Math.random() * maximoAtk);

    }

     usarCurar(): void {
    
        if (this.HP <= 50 && !this.jaCurou) {
            this.HP = this.HP = this.cura;
            this.jaCurou = true;
            console.log(`${this.nome} usou a cura. Vida atual: ${this.HP}`);
        }
    }

    public abstract atacar(pers:Personagem):void;

}
