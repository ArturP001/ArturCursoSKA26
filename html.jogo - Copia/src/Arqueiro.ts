import { Personagem, ResultadoAtaque } from "./Personagem";

export class Arqueiro extends Personagem {
  private static readonly DANOS_ATAQUE = [18, 22, 28, 38];
  private static readonly NOMES_ATAQUE = [
    "Flecha Rápida",
    "Flecha Dupla",
    "Chuva de Flechas",
    "Flecha Explosiva"
  ];

  constructor(nome: string) {
    // HP: 100, Força: 14, Cura: 18, Defesa: 12%
    super(nome, 14, 100, 18, 12, "src/img/gato.png");
  }

  public atacar(pers: Personagem): ResultadoAtaque {
    return this.executarAtaque(pers);
  }

  protected getDanoDoAtaque(numeroAtaque: number): number {
    const bonusAtaque = Arqueiro.DANOS_ATAQUE[numeroAtaque - 1] ?? 0;
    return this.forca + bonusAtaque;
  }

  protected getNomeAtaque(numeroAtaque: number): string {
    return Arqueiro.NOMES_ATAQUE[numeroAtaque - 1] ?? "Ataque Desconhecido";
  }
}
