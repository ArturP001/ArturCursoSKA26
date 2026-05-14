import { Arqueiro } from "./Arqueiro";
import { Cavaleiro } from "./Cavaleiro";
import { Jogo } from "./Jogo";
import { Mago } from "./Mago";
import { Personagem } from "./Personagem";

// Conecta o TypeScript com os elementos do HTML.
const jogo: Jogo = new Jogo();
const telaMenu = document.getElementById("tela-menu") as HTMLElement;
const telaBatalha = document.getElementById("tela-batalha") as HTMLElement;
const btnComecar = document.getElementById("btn-comecar") as HTMLButtonElement;
const btnReiniciar = document.getElementById("btn-reiniciar") as HTMLButtonElement;
const btnVoltarMenu = document.getElementById("btn-voltar-menu") as HTMLButtonElement;
const selectPlayer1 = document.getElementById("select-player1") as HTMLSelectElement;
const selectPlayer2 = document.getElementById("select-player2") as HTMLSelectElement;

// Cria o personagem de acordo com a opcao escolhida no select.
function criarPersonagem(tipo: string): Personagem {
  switch (tipo) {
    case "cavaleiro":
      return new Cavaleiro("Cavaleiro");
    case "mago":
      return new Mago("Mago");
    case "arqueiro":
      return new Arqueiro("Arqueiro");
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

// Mostra apenas a tela de selecao.
function mostrarMenu(): void {
  telaMenu.classList.remove("escondido");
  telaBatalha.classList.add("escondido");
}

// Mostra apenas a tela da batalha.
function mostrarBatalha(): void {
  telaMenu.classList.add("escondido");
  telaBatalha.classList.remove("escondido");
}

// Inicia a batalha usando os personagens escolhidos no menu.
async function comecarBatalha(): Promise<void> {
  const { player1, player2 } = criaPersonagens();

  mostrarBatalha();
  btnComecar.disabled = true;
  btnReiniciar.disabled = true;
  btnVoltarMenu.disabled = true;

  await jogo.inicia(player1, player2);

  btnComecar.disabled = false;
  btnReiniciar.disabled = false;
  btnVoltarMenu.disabled = false;
}

// Reinicia a batalha mantendo os personagens escolhidos.
async function reiniciar(): Promise<void> {
  await comecarBatalha();
}

// Volta para o menu para escolher outros personagens.
function voltarMenu(): void {
  mostrarMenu();
}

// Eventos dos botoes.
btnComecar.addEventListener("click", comecarBatalha);
btnReiniciar.addEventListener("click", reiniciar);
btnVoltarMenu.addEventListener("click", voltarMenu);

// Comeca mostrando apenas o menu.
mostrarMenu();
