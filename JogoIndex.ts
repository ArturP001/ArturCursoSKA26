import { Cavaleiro } from "./Cavaleiro.ts";
import { Jogo } from "./Jogo.ts";
import { Mago } from "./Mago.ts";

let mago:Mago = new Mago("Mago", 10, 100);
let cavaleiro:Cavaleiro = new Cavaleiro("Cavaleiro", 10, 100);
let jogo:Jogo = new Jogo();
jogo.inicia(mago, cavaleiro);