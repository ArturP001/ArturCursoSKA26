import { pessoa } from "./pessoa.ts";
import { Aluno } from "./Aluno.ts";
import { Professor } from "./Professor.ts";

let User:pessoa= new pessoa("João", "Eduardo", 18);
User.falar();

let User2:Aluno= new Aluno("Pedro", 17, "Fisica", 10);
User2.mudarNota(9);
User2.falar();

let Prof:Professor= new Professor("Renan", 27, "Fisica", 10);
Prof.falar();

