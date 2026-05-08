"use strict";
(() => {
  // src/Personagem.ts
  var Personagem = class {
    constructor(nome, forca, HP, cura, defesa, imagem) {
      this.jaCurou = false;
      this.nome = nome;
      this.forca = forca;
      this.HP = HP;
      this.cura = cura;
      this.defesa = defesa;
      this.imagem = imagem;
    }
    isVivo() {
      return this.HP > 0;
    }
    sofrerAtaque(dano) {
      const danoReal = dano - dano * (this.defesa / 100);
      this.HP = Math.max(0, this.HP - danoReal);
      console.log(`${this.nome} recebeu ${danoReal} de dano. Vida atual: ${this.HP}`);
    }
    gerarAtaque() {
      const maximoAtk = 4;
      return Math.floor(Math.random() * maximoAtk) + 1;
    }
    getVida() {
      return this.HP;
    }
    getImagem() {
      return this.imagem;
    }
    usarCurar() {
      if (this.HP <= 50 && !this.jaCurou) {
        this.HP += this.cura;
        this.jaCurou = true;
        console.log(`${this.nome} usou a cura. Vida atual: ${this.HP}`);
      }
    }
  };

  // src/Arqueiro.ts
  var Arqueiro = class extends Personagem {
    constructor(nome, forca, HP) {
      super(
        nome,
        forca,
        HP,
        20,
        10,
        "src/img/gato.png"
      );
    }
    atacar(pers) {
      let dado = this.gerarAtaque();
      switch (dado) {
        case 1:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 1`
          );
          pers.sofrerAtaque(this.forca + 20);
          break;
        case 2:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 2`
          );
          pers.sofrerAtaque(this.forca + 20);
          break;
        case 3:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 3`
          );
          pers.sofrerAtaque(this.forca + 30);
          break;
        case 4:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 4`
          );
          pers.sofrerAtaque(this.forca + 35);
          break;
        default:
          break;
      }
    }
  };

  // src/Cavaleiro.ts
  var Cavaleiro = class extends Personagem {
    constructor(nome, forca, HP) {
      super(
        nome,
        forca,
        HP,
        20,
        10,
        "https://static.vecteezy.com/system/resources/previews/069/210/287/non_2x/pixel-art-cat-warrior-in-red-cape-png.png"
      );
    }
    atacar(pers) {
      let dado = this.gerarAtaque();
      switch (dado) {
        case 1:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 1`
          );
          pers.sofrerAtaque(this.forca + 20);
          break;
        case 2:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 2`
          );
          pers.sofrerAtaque(this.forca + 20);
          break;
        case 3:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 3`
          );
          pers.sofrerAtaque(this.forca + 30);
          break;
        case 4:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 4`
          );
          pers.sofrerAtaque(this.forca + 35);
          break;
        default:
          break;
      }
    }
  };

  // src/Jogo.ts
  var VIDA_MAXIMA = 100;
  var Jogo = class {
    async inicia(player1, player2) {
      let turno = 1;
      this.limpaLog();
      this.atualizaInterface(player1, player2);
      while (player1.isVivo() && player2.isVivo()) {
        this.log(`========== TURNO ${turno} ==========`);
        player1.atacar(player2);
        this.log(`${player1.nome} atacou ${player2.nome}. ${player2.nome} ficou com ${player2.getVida()} HP.`);
        this.atualizaInterface(player1, player2);
        await this.esperaTempo();
        if (!player2.isVivo()) {
          break;
        }
        player2.atacar(player1);
        this.log(`${player2.nome} atacou ${player1.nome}. ${player1.nome} ficou com ${player1.getVida()} HP.`);
        this.atualizaInterface(player1, player2);
        await this.esperaTempo();
        turno += 1;
      }
      const vencedor = player1.isVivo() ? player1 : player2;
      this.log(`${vencedor.nome} ganhou a luta!`);
      return vencedor;
    }
    reiniciaInterface(player1, player2) {
      this.limpaLog();
      this.log("Aguardando batalha...");
      this.atualizaInterface(player1, player2);
    }
    buscaComponenteHtml(id) {
      const elemento = document.getElementById(id);
      if (!elemento) {
        throw new Error(`Elemento HTML nao encontrado: ${id}`);
      }
      return elemento;
    }
    limpaLog() {
      this.buscaComponenteHtml("console").textContent = "";
    }
    log(mensagem) {
      const consoleHtml = this.buscaComponenteHtml("console");
      consoleHtml.textContent += `${mensagem}
`;
      consoleHtml.scrollTop = consoleHtml.scrollHeight;
    }
    atualizaInterface(player1, player2) {
      this.buscaComponenteHtml("imagemCavaleiro").src = player1.getImagem();
      this.buscaComponenteHtml("imagemMago").src = player2.getImagem();
      this.atualizaVida("cavaleiro", player1);
      this.atualizaVida("mago", player2);
      this.buscaComponenteHtml("nome-cavaleiro").textContent = player1.nome;
      this.buscaComponenteHtml("nome-mago").textContent = player2.nome;
    }
    atualizaVida(prefixo, player) {
      const vida = Math.round(player.getVida());
      const porcentagem = Math.max(0, Math.min(100, vida / VIDA_MAXIMA * 100));
      const barra = this.buscaComponenteHtml(`${prefixo}-bar`);
      this.buscaComponenteHtml(`${prefixo}-hp`).textContent = `${vida} / ${VIDA_MAXIMA}`;
      barra.style.width = `${porcentagem}%`;
      barra.style.background = porcentagem <= 30 ? "#c0392b" : "#27ae60";
    }
    esperaTempo() {
      return new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  // src/Mago.ts
  var Mago = class extends Personagem {
    constructor(nome, forca, HP) {
      super(nome, forca, HP, 20, 10, "https://static.vecteezy.com/system/resources/thumbnails/069/209/991/small/pixel-art-wizard-cat-with-staff-and-purple-robe-png.png");
    }
    atacar(pers) {
      let dado = this.gerarAtaque();
      switch (dado) {
        case 1:
          console.log(`${this.nome} atacou o personagem: ${pers.nome} com ataque 1`);
          pers.sofrerAtaque(this.forca + 20);
          break;
        case 2:
          console.log(`${this.nome} atacou o personagem: ${pers.nome} com ataque 2`);
          pers.sofrerAtaque(this.forca + 20);
          break;
        case 3:
          console.log(`${this.nome} atacou o personagem: ${pers.nome} com ataque 3`);
          pers.sofrerAtaque(this.forca + 30);
          break;
        case 4:
          console.log(
            `${this.nome} atacou o personagem: ${pers.nome} com ataque 4`
          );
          pers.sofrerAtaque(this.forca + 35);
          break;
        default:
          break;
      }
    }
  };

  // src/JogoIndex.ts
  var jogo = new Jogo();
  var btnJogar = document.getElementById("btn-jogar");
  var btnReiniciar = document.getElementById("btn-reiniciar");
  var selectPlayer1 = document.getElementById("select-player1");
  var selectPlayer2 = document.getElementById("select-player2");
  function criarPersonagem(tipo) {
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
  function criaPersonagens() {
    return {
      player1: criarPersonagem(selectPlayer1.value),
      player2: criarPersonagem(selectPlayer2.value)
    };
  }
  function reiniciar() {
    const { player1, player2 } = criaPersonagens();
    btnJogar.disabled = false;
    jogo.reiniciaInterface(player1, player2);
  }
  async function jogar() {
    const { player1, player2 } = criaPersonagens();
    btnJogar.disabled = true;
    btnReiniciar.disabled = true;
    await jogo.inicia(player1, player2);
    btnJogar.disabled = false;
    btnReiniciar.disabled = false;
  }
  btnJogar.addEventListener("click", jogar);
  btnReiniciar.addEventListener("click", reiniciar);
  selectPlayer1.addEventListener("change", reiniciar);
  selectPlayer2.addEventListener("change", reiniciar);
  reiniciar();
})();
