import { Personagem, ResultadoAtaque } from "./Personagem";

export class Cavaleiro extends Personagem {
  private static readonly DANOS_ATAQUE = [20, 25, 30, 40];
  private static readonly NOMES_ATAQUE = [
    "Golpe Básico",
    "Golpe Duplo",
    "Ataque Pesado",
    "Golpe Crítico"
  ];

  constructor(nome: string) {
    // HP: 120, Força: 15, Cura: 20, Defesa: 20%
    super(nome, 15, 120, 20, 20, "https://static.vecteezy.com/system/resources/previews/069/210/287/non_2x/pixel-art-cat-warrior-in-red-cape-png.png");
  }

  public atacar(pers: Personagem): ResultadoAtaque {
    return this.executarAtaque(pers);
  }

  protected getDanoDoAtaque(numeroAtaque: number): number {
    const bonusAtaque = Cavaleiro.DANOS_ATAQUE[numeroAtaque - 1] ?? 0;
    return this.forca + bonusAtaque;
  }

  protected getNomeAtaque(numeroAtaque: number): string {
    return Cavaleiro.NOMES_ATAQUE[numeroAtaque - 1] ?? "Ataque Desconhecido";
  }
}
