export type ResultadoAtaque = {
  atacante: string;
  alvo: string;
  numeroAtaque: number;
  danoBase: number;
  danoReal: number;
  vidaAlvo: number;
};

export abstract class Personagem {
  private static readonly VIDA_MAXIMA = 100;

  // Atributos principais que todos os personagens possuem.
  public nome: string;
  protected forca: number;
  protected HP: number;
  protected cura: number;
  private jaCurou: boolean = false;
  protected defesa: number;
  protected imagem: string;

  // Recebe os valores iniciais do personagem.
  constructor(nome: string, forca: number, HP: number, cura: number, defesa: number, imagem: string) {
    this.nome = nome;
    this.forca = forca;
    this.HP = HP;
    this.cura = cura;
    this.defesa = defesa;
    this.imagem = imagem;
  }

  // Verifica se o personagem ainda tem vida.
  isVivo(): boolean {
    return this.HP > 0;
  }

  // Aplica o dano recebido considerando a defesa.
  sofrerAtaque(dano: number): number {
    const danoReal = dano - dano * (this.defesa / 100);
    this.HP = Math.max(0, this.HP - danoReal);

    return danoReal;
  }

  // Sorteia qual ataque sera usado.
  gerarAtaque(): number {
    const maximoAtk = 4;
    return Math.floor(Math.random() * maximoAtk) + 1;
  }

  // Retorna a vida atual.
  getVida(): number {
    return this.HP;
  }

  // Retorna a imagem usada na tela.
  getImagem(): string {
    return this.imagem;
  }

  // Usa a cura apenas uma vez quando a vida esta baixa.
  usarCurar(): number {
    if (this.isVivo() && this.HP <= 50 && !this.jaCurou) {
      const vidaAntes = this.HP;
      this.HP = Math.min(Personagem.VIDA_MAXIMA, this.HP + this.cura);
      this.jaCurou = true;
      return this.HP - vidaAntes;
    }

    return 0;
  }

  protected executarAtaque(pers: Personagem): ResultadoAtaque {
    const numeroAtaque = this.gerarAtaque();
    const danoBase = this.getDanoDoAtaque(numeroAtaque);
    const danoReal = pers.sofrerAtaque(danoBase);

    return {
      atacante: this.nome,
      alvo: pers.nome,
      numeroAtaque,
      danoBase,
      danoReal,
      vidaAlvo: pers.getVida(),
    };
  }

  private getDanoDoAtaque(numeroAtaque: number): number {
    const danos = [20, 20, 30, 35];
    const bonusAtaque = danos[numeroAtaque - 1] ?? 0;

    return this.forca + bonusAtaque;
  }

  // Cada classe filha precisa criar seu proprio ataque.
  public abstract atacar(pers: Personagem): ResultadoAtaque;
}
