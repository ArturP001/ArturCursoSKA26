import { Personagem, ResultadoAtaque } from "./Personagem";

export class Mago extends Personagem {
  private static readonly DANOS_ATAQUE = [15, 20, 35, 50];
  private static readonly NOMES_ATAQUE = [
    "Magia de Fogo",
    "Magia de Gelo",
    "Raio Arcano",
    "Explosão Mágica"
  ];

  constructor(nome: string) {
    // HP: 80, Força: 20, Cura: 15, Defesa: 5%
    super(nome, 20, 100, 15, 5, "https://static.vecteezy.com/system/resources/thumbnails/069/209/991/small/pixel-art-wizard-cat-with-staff-and-purple-robe-png.png");
  }

  public atacar(pers: Personagem): ResultadoAtaque {
    return this.executarAtaque(pers);
  }

  protected getDanoDoAtaque(numeroAtaque: number): number {
    const bonusAtaque = Mago.DANOS_ATAQUE[numeroAtaque - 1] ?? 0;
    return this.forca + bonusAtaque;
  }

  protected getNomeAtaque(numeroAtaque: number): string {
    return Mago.NOMES_ATAQUE[numeroAtaque - 1] ?? "Ataque Desconhecido";
  }
}
