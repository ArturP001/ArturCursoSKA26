import { Veiculo } from "./Veiculo.ts";

export class Carro extends Veiculo{
    public velocidade:number = 0;

    buzinar(){
        this.velocidade = 10;
    }

}