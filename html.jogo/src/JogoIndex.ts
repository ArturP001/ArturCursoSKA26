import { Arqueiro } from "./Arqueiro";
import { Cavaleiro } from "./Cavaleiro";
import { Jogo } from "./Jogo";
import { Mago } from "./Mago";
import { Personagem } from "./Personagem";

// Conecta o TypeScript com os elementos do HTML.
const jogo: Jogo = new Jogo();
const btnJogar = document.getElementById("btn-jogar") as HTMLButtonElement;
const btnReiniciar = document.getElementById("btn-reiniciar") as HTMLButtonElement;
const selectPlayer1 = document.getElementById("select-player1") as HTMLSelectElement;
const selectPlayer2 = document.getElementById("select-player2") as HTMLSelectElement;

// Cria o personagem de acordo com a opcao escolhida no select.
function criarPersonagem(tipo: string): Personagem {
  switch (tipo) {
    case "cavaleiro":
      return new Cavaleiro("Cavaleiro", 10, 100);
    case "mago":
      return new Mago("Mago", 10, 100);
    case "arqueiro":
      return new Arqueiro("Arqueiro", 10, 100);
    default:
      throw new Error("Personagem selecionado invalido");
  }
}

// Monta os dois jogadores que vao lutar.
function criaPersonagens(): { player1: Personagem; player2: Personagem } {
  return {
    player1: criarPersonagem(selectPlayer1.value),
    player2: criarPersonagem(selectPlayer2.value),
  };
}

// Reinicia a tela usando os personagens selecionados.
function reiniciar(): void {
  const { player1, player2 } = criaPersonagens();
  btnJogar.disabled = false;
  jogo.reiniciaInterface(player1, player2);
}

// Inicia a batalha e trava os botoes enquanto ela acontece.
async function jogar(): Promise<void> {
  const { player1, player2 } = criaPersonagens();
  btnJogar.disabled = true;
  btnReiniciar.disabled = true;

  await jogo.inicia(player1, player2);

  btnJogar.disabled = false;
  btnReiniciar.disabled = false;
}

// Eventos dos botoes e dos selects.
btnJogar.addEventListener("click", jogar);
btnReiniciar.addEventListener("click", reiniciar);
selectPlayer1.addEventListener("change", reiniciar);
selectPlayer2.addEventListener("change", reiniciar);

// Prepara a tela assim que a pagina abre.
reiniciar();
