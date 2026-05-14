"use strict";
(() => {
  // src/Personagem.ts
  var Personagem = class _Personagem {
    // Recebe os valores iniciais do personagem.
    constructor(nome, forca, HP, cura, defesa, imagem) {
      this.jaCurou = false;
      this.nome = nome;
      this.forca = forca;
      this.HP = HP;
      this.cura = cura;
      this.defesa = defesa;
      this.imagem = imagem;
    }
    static {
      this.VIDA_MAXIMA = 100;
    }
    // Verifica se o personagem ainda tem vida.
    isVivo() {
      return this.HP > 0;
    }
    // Aplica o dano recebido considerando a defesa.
    sofrerAtaque(dano) {
      const danoReal = dano - dano * (this.defesa / 100);
      this.HP = Math.max(0, this.HP - danoReal);
      return danoReal;
    }
    // Sorteia qual ataque sera usado.
    gerarAtaque() {
      const maximoAtk = 4;
      return Math.floor(Math.random() * maximoAtk) + 1;
    }
    // Retorna a vida atual.
    getVida() {
      return this.HP;
    }
    // Retorna a imagem usada na tela.
    getImagem() {
      return this.imagem;
    }
    // Usa a cura apenas uma vez quando a vida esta baixa.
    usarCurar() {
      if (this.isVivo() && this.HP <= 50 && !this.jaCurou) {
        const vidaAntes = this.HP;
        this.HP = Math.min(_Personagem.VIDA_MAXIMA, this.HP + this.cura);
        this.jaCurou = true;
        return this.HP - vidaAntes;
      }
      return 0;
    }
    executarAtaque(pers) {
      const numeroAtaque = this.gerarAtaque();
      const danoBase = this.getDanoDoAtaque(numeroAtaque);
      const danoReal = pers.sofrerAtaque(danoBase);
      const nomeAtaque = this.getNomeAtaque(numeroAtaque);
      return {
        atacante: this.nome,
        alvo: pers.nome,
        numeroAtaque,
        nomeAtaque,
        danoBase,
        danoReal,
        vidaAlvo: pers.getVida()
      };
    }
    getDanoDoAtaque(numeroAtaque) {
      const danos = [20, 20, 30, 35];
      const bonusAtaque = danos[numeroAtaque - 1] ?? 0;
      return this.forca + bonusAtaque;
    }
  };

  // src/Arqueiro.ts
  var Arqueiro = class _Arqueiro extends Personagem {
    static {
      this.DANOS_ATAQUE = [18, 22, 28, 38];
    }
    static {
      this.NOMES_ATAQUE = [
        "Flecha R\xE1pida",
        "Flecha Dupla",
        "Chuva de Flechas",
        "Flecha Explosiva"
      ];
    }
    constructor(nome) {
      super(nome, 14, 100, 18, 12, "src/img/gato.png");
    }
    atacar(pers) {
      return this.executarAtaque(pers);
    }
    getDanoDoAtaque(numeroAtaque) {
      const bonusAtaque = _Arqueiro.DANOS_ATAQUE[numeroAtaque - 1] ?? 0;
      return this.forca + bonusAtaque;
    }
    getNomeAtaque(numeroAtaque) {
      return _Arqueiro.NOMES_ATAQUE[numeroAtaque - 1] ?? "Ataque Desconhecido";
    }
  };

  // src/Cavaleiro.ts
  var Cavaleiro = class _Cavaleiro extends Personagem {
    static {
      this.DANOS_ATAQUE = [20, 25, 30, 40];
    }
    static {
      this.NOMES_ATAQUE = [
        "Golpe B\xE1sico",
        "Golpe Duplo",
        "Ataque Pesado",
        "Golpe Cr\xEDtico"
      ];
    }
    constructor(nome) {
      super(nome, 15, 120, 20, 20, "https://static.vecteezy.com/system/resources/previews/069/210/287/non_2x/pixel-art-cat-warrior-in-red-cape-png.png");
    }
    atacar(pers) {
      return this.executarAtaque(pers);
    }
    getDanoDoAtaque(numeroAtaque) {
      const bonusAtaque = _Cavaleiro.DANOS_ATAQUE[numeroAtaque - 1] ?? 0;
      return this.forca + bonusAtaque;
    }
    getNomeAtaque(numeroAtaque) {
      return _Cavaleiro.NOMES_ATAQUE[numeroAtaque - 1] ?? "Ataque Desconhecido";
    }
  };

  // src/Jogo.ts
  var VIDA_MAXIMA = 100;
  var Jogo = class {
    // Inicia a batalha e alterna os ataques entre os dois personagens.
    async inicia(player1, player2) {
      let turno = 1;
      this.limpaLog();
      this.atualizaInterface(player1, player2);
      this.log(`Batalha iniciada: ${player1.nome} vs ${player2.nome}`);
      while (player1.isVivo() && player2.isVivo()) {
        this.log(`
==========================TURNO ${turno}============================ `);
        const ataquePlayer1 = player1.atacar(player2);
        this.log(this.criaMensagemAtaque(ataquePlayer1));
        this.tentaCurar(player2);
        this.atualizaInterface(player1, player2);
        await this.esperaTempo();
        if (!player2.isVivo()) {
          break;
        }
        const ataquePlayer2 = player2.atacar(player1);
        this.log(this.criaMensagemAtaque(ataquePlayer2));
        this.tentaCurar(player1);
        this.atualizaInterface(player1, player2);
        await this.esperaTempo();
        turno += 1;
      }
      const vencedor = player1.isVivo() ? player1 : player2;
      this.log(`
Vencedor: ${vencedor.nome}!`);
      return vencedor;
    }
    // Volta a interface para o estado inicial.
    reiniciaInterface(player1, player2) {
      this.limpaLog();
      this.log("Aguardando batalha...");
      this.atualizaInterface(player1, player2);
    }
    // Busca um elemento do HTML pelo id.
    buscaComponenteHtml(id) {
      const elemento = document.getElementById(id);
      if (!elemento) {
        throw new Error(`Elemento HTML nao encontrado: ${id}`);
      }
      return elemento;
    }
    // Apaga as mensagens antigas do console.
    limpaLog() {
      this.buscaComponenteHtml("console").textContent = "";
    }
    // Escreve uma nova mensagem no console da tela.
    log(mensagem) {
      const consoleHtml = this.buscaComponenteHtml("console");
      consoleHtml.innerHTML += `<p>${mensagem}</p>`;
      consoleHtml.scrollTop = consoleHtml.scrollHeight;
    }
    criaMensagemAtaque(ataque) {
      return [
        `${ataque.atacante} usou ${ataque.nomeAtaque} em ${ataque.alvo}!`,
        `Dano base: ${this.formataNumero(ataque.danoBase)}.`,
        `Dano final: ${this.formataNumero(ataque.danoReal)}.`,
        `HP de ${ataque.alvo}: ${this.formataNumero(ataque.vidaAlvo)}.`
      ].join(" ");
    }
    tentaCurar(player) {
      const curaRecebida = player.usarCurar();
      if (curaRecebida > 0) {
        this.log(
          `${player.nome} usou cura (+${this.formataNumero(curaRecebida)} HP). HP atual: ${this.formataNumero(player.getVida())}.`
        );
      }
    }
    formataNumero(numero) {
      return Number.isInteger(numero) ? String(numero) : numero.toFixed(1);
    }
    // Atualiza imagens, nomes e barras de vida dos personagens.
    atualizaInterface(player1, player2) {
      this.buscaComponenteHtml("imagemCavaleiro").src = player1.getImagem();
      this.buscaComponenteHtml("imagemMago").src = player2.getImagem();
      this.atualizaVida("cavaleiro", player1);
      this.atualizaVida("mago", player2);
      this.buscaComponenteHtml("nome-cavaleiro").textContent = player1.nome;
      this.buscaComponenteHtml("nome-mago").textContent = player2.nome;
    }
    // Atualiza o texto e o tamanho da barra de HP.
    atualizaVida(prefixo, player) {
      const vida = Math.round(player.getVida());
      const porcentagem = Math.max(0, Math.min(100, vida / VIDA_MAXIMA * 100));
      const barra = this.buscaComponenteHtml(`${prefixo}-bar`);
      this.buscaComponenteHtml(`${prefixo}-hp`).textContent = `${vida} / ${VIDA_MAXIMA}`;
      barra.style.width = `${porcentagem}%`;
      barra.style.background = porcentagem <= 30 ? "#c0392b" : "#27ae60";
    }
    // Pequena pausa entre os ataques para a luta ficar mais legivel.
    esperaTempo() {
      return new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  // src/Mago.ts
  var Mago = class _Mago extends Personagem {
    static {
      this.DANOS_ATAQUE = [15, 20, 35, 50];
    }
    static {
      this.NOMES_ATAQUE = [
        "Magia de Fogo",
        "Magia de Gelo",
        "Raio Arcano",
        "Explos\xE3o M\xE1gica"
      ];
    }
    constructor(nome) {
      super(nome, 20, 100, 15, 5, "https://static.vecteezy.com/system/resources/thumbnails/069/209/991/small/pixel-art-wizard-cat-with-staff-and-purple-robe-png.png");
    }
    atacar(pers) {
      return this.executarAtaque(pers);
    }
    getDanoDoAtaque(numeroAtaque) {
      const bonusAtaque = _Mago.DANOS_ATAQUE[numeroAtaque - 1] ?? 0;
      return this.forca + bonusAtaque;
    }
    getNomeAtaque(numeroAtaque) {
      return _Mago.NOMES_ATAQUE[numeroAtaque - 1] ?? "Ataque Desconhecido";
    }
  };

  // src/JogoIndex.ts
  var jogo = new Jogo();
  var telaMenu = document.getElementById("tela-menu");
  var telaBatalha = document.getElementById("tela-batalha");
  var btnComecar = document.getElementById("btn-comecar");
  var btnReiniciar = document.getElementById("btn-reiniciar");
  var btnVoltarMenu = document.getElementById("btn-voltar-menu");
  var selectPlayer1 = document.getElementById("select-player1");
  var selectPlayer2 = document.getElementById("select-player2");
  function criarPersonagem(tipo) {
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
  function criaPersonagens() {
    return {
      player1: criarPersonagem(selectPlayer1.value),
      player2: criarPersonagem(selectPlayer2.value)
    };
  }
  function mostrarMenu() {
    telaMenu.classList.remove("escondido");
    telaBatalha.classList.add("escondido");
  }
  function mostrarBatalha() {
    telaMenu.classList.add("escondido");
    telaBatalha.classList.remove("escondido");
  }
  async function comecarBatalha() {
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
  async function reiniciar() {
    await comecarBatalha();
  }
  function voltarMenu() {
    mostrarMenu();
  }
  btnComecar.addEventListener("click", comecarBatalha);
  btnReiniciar.addEventListener("click", reiniciar);
  btnVoltarMenu.addEventListener("click", voltarMenu);
  mostrarMenu();
})();
