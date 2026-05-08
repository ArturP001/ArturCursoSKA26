export abstract class Personagem {
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
  sofrerAtaque(dano: number): void {
    const danoReal = dano - dano * (this.defesa / 100);
    this.HP = Math.max(0, this.HP - danoReal);

    console.log(`${this.nome} recebeu ${danoReal} de dano. Vida atual: ${this.HP}`);
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
  usarCurar(): void {
    if (this.HP <= 50 && !this.jaCurou) {
      this.HP += this.cura;
      this.jaCurou = true;
      console.log(`${this.nome} usou a cura. Vida atual: ${this.HP}`);
    }
  }

  // Cada classe filha precisa criar seu proprio ataque.
  public abstract atacar(pers: Personagem): void;
}
