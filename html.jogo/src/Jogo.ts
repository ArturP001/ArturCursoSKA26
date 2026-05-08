import { Personagem } from "./Personagem";

const VIDA_MAXIMA = 100;

export class Jogo {
  // Inicia a batalha e alterna os ataques entre os dois personagens.
  public async inicia(player1: Personagem, player2: Personagem): Promise<Personagem> {
    let turno = 1;
    this.limpaLog();
    this.atualizaInterface(player1, player2);

    while (player1.isVivo() && player2.isVivo()) {
      this.log(`========== TURNO ${turno} ==========`);

      // Primeiro personagem ataca.
      player1.atacar(player2);
      this.log(`${player1.nome} atacou ${player2.nome}. ${player2.nome} ficou com ${player2.getVida()} HP.`);
      this.atualizaInterface(player1, player2);
      await this.esperaTempo();

      if (!player2.isVivo()) {
        break;
      }

      // Segundo personagem contra-ataca.
      player2.atacar(player1);
      this.log(`${player2.nome} atacou ${player1.nome}. ${player1.nome} ficou com ${player1.getVida()} HP.`);
      this.atualizaInterface(player1, player2);
      await this.esperaTempo();

      turno += 1;
    }

    // Quem ainda estiver vivo no final e o vencedor.
    const vencedor = player1.isVivo() ? player1 : player2;
    this.log(`${vencedor.nome} ganhou a luta!`);
    return vencedor;
  }

  // Volta a interface para o estado inicial.
  public reiniciaInterface(player1: Personagem, player2: Personagem): void {
    this.limpaLog();
    this.log("Aguardando batalha...");
    this.atualizaInterface(player1, player2);
  }

  // Busca um elemento do HTML pelo id.
  private buscaComponenteHtml(id: string): HTMLElement {
    const elemento = document.getElementById(id);

    if (!elemento) {
      throw new Error(`Elemento HTML nao encontrado: ${id}`);
    }

    return elemento;
  }

  // Apaga as mensagens antigas do console.
  private limpaLog(): void {
    this.buscaComponenteHtml("console").textContent = "";
  }

  // Escreve uma nova mensagem no console da tela.
  public log(mensagem: string): void {
    const consoleHtml = this.buscaComponenteHtml("console");
    consoleHtml.textContent += `${mensagem}\n`;
    consoleHtml.scrollTop = consoleHtml.scrollHeight;
  }

  // Atualiza imagens, nomes e barras de vida dos personagens.
  public atualizaInterface(player1: Personagem, player2: Personagem): void {
    (this.buscaComponenteHtml("imagemCavaleiro") as HTMLImageElement).src = player1.getImagem();
    (this.buscaComponenteHtml("imagemMago") as HTMLImageElement).src = player2.getImagem();

    this.atualizaVida("cavaleiro", player1);
    this.atualizaVida("mago", player2);

    this.buscaComponenteHtml("nome-cavaleiro").textContent = player1.nome;
    this.buscaComponenteHtml("nome-mago").textContent = player2.nome;
  }

  // Atualiza o texto e o tamanho da barra de HP.
  private atualizaVida(prefixo: string, player: Personagem): void {
    const vida = Math.round(player.getVida());
    const porcentagem = Math.max(0, Math.min(100, (vida / VIDA_MAXIMA) * 100));
    const barra = this.buscaComponenteHtml(`${prefixo}-bar`);

    this.buscaComponenteHtml(`${prefixo}-hp`).textContent = `${vida} / ${VIDA_MAXIMA}`;
    barra.style.width = `${porcentagem}%`;
    barra.style.background = porcentagem <= 30 ? "#c0392b" : "#27ae60";
  }

  // Pequena pausa entre os ataques para a luta ficar mais legivel.
  public esperaTempo(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 800));
  }
}
