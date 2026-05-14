import { Personagem, ResultadoAtaque } from "./Personagem";

const VIDA_MAXIMA = 100;

export class Jogo {
  // Inicia a batalha e alterna os ataques entre os dois personagens.
  public async inicia(player1: Personagem, player2: Personagem): Promise<Personagem> {
    let turno = 1;
    this.limpaLog();
    this.atualizaInterface(player1, player2);
    this.log(`Batalha iniciada: ${player1.nome} vs ${player2.nome}`);

    while (player1.isVivo() && player2.isVivo()) {
      this.log(`\n==========================TURNO ${turno}============================ `);

      // Primeiro personagem ataca.
      const ataquePlayer1 = player1.atacar(player2);
      this.log(this.criaMensagemAtaque(ataquePlayer1));
      this.tentaCurar(player2);
      this.atualizaInterface(player1, player2);
      await this.esperaTempo();

      if (!player2.isVivo()) {
        break;
      }

      // Segundo personagem contra-ataca.
      const ataquePlayer2 = player2.atacar(player1);
      this.log(this.criaMensagemAtaque(ataquePlayer2));
      this.tentaCurar(player1);
      this.atualizaInterface(player1, player2);
      await this.esperaTempo();

      turno += 1;
    }

    // Quem ainda estiver vivo no final e o vencedor.
    const vencedor = player1.isVivo() ? player1 : player2;
    this.log(`\nVencedor: ${vencedor.nome}!`);
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
    const consoleHtml = (this.buscaComponenteHtml("console")) as HTMLElement;
    consoleHtml.innerHTML += `<p>${mensagem}</p>`;
    consoleHtml.scrollTop = consoleHtml.scrollHeight;
  }

  private criaMensagemAtaque(ataque: ResultadoAtaque): string {
    return [
      `${ataque.atacante} usou ataque ${ataque.numeroAtaque} em ${ataque.alvo}.`,
      `Dano base: ${this.formataNumero(ataque.danoBase)}.`,
      `Dano final: ${this.formataNumero(ataque.danoReal)}.`,
      `HP de ${ataque.alvo}: ${this.formataNumero(ataque.vidaAlvo)}.`,
    ].join(" ");
  }

  private tentaCurar(player: Personagem): void {
    const curaRecebida = player.usarCurar();

    if (curaRecebida > 0) {
      this.log(
        `${player.nome} usou cura (+${this.formataNumero(curaRecebida)} HP). ` +
          `HP atual: ${this.formataNumero(player.getVida())}.`,
      );
    }
  }

  private formataNumero(numero: number): string {
    return Number.isInteger(numero) ? String(numero) : numero.toFixed(1);
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
