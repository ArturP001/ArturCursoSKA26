export class Veiculo {

    public    marca: string;
    protected velocidade: number = 0;

  constructor(marca:string, velocidade:number){
    this.marca = marca;
    this.velocidade = velocidade;
  }

  acelerar(velocidade: number): void {
    this.velocidade += velocidade;
  }

  exibir(): string {
    return `${this.marca} a ${this.velocidade} km/h`;
  }
}
