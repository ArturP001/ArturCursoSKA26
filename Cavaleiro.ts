import {Personagem} from"./Personagem.ts";

export class Cavaleiro extends Personagem{

      constructor(nome:string, forca:number, HP:number){
        super(nome, forca, HP, 20, 10);

    }

    public atacar(pers: Personagem): void {
    let dado = this.gerarAtaque();
    switch(dado){
    case 1:
        console.log(`${this.nome} atacou o personagem: ${pers.nome} com ataque 1`,);
        pers.sofrerAtaque(this.forca + 20);
        break;
      case 2:
        console.log(
          `${this.nome} atacou o personagem: ${pers.nome} com ataque 2`,);
        pers.sofrerAtaque(this.forca + 20);
        break;
      case 3:
        console.log(
          `${this.nome} atacou o personagem: ${pers.nome} com ataque 3`,
        );
        pers.sofrerAtaque(this.forca + 30);
        break;
      case 4:
        console.log(
          `${this.nome} atacou o personagem: ${pers.nome} com ataque 4`,);
        pers.sofrerAtaque(this.forca + 35);
        break;

      default:
        break;
    }
  }
}



