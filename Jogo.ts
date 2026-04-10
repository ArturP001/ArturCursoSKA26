import { Personagem } from "./Personagem.ts";

export class Jogo{

    public inicia(player1:Personagem, player2:Personagem){

        let turno = 1
        while(player1.isVivo() && player2.isVivo){
            player1.atacar(player2);
            console.log(`\n ========== TURNO ${turno} ===========`);

            if(!player2.isVivo()){
                break;
            }

            player2.atacar(player1);

            turno += 1;
        }

        if(player1.isVivo()){
            console.log(`${player1} GANHOU A LUTA`);

        }else{
            console.log(`${player2} GANHOU A LUTA`);
        }

    }

}