import { Time } from "@angular/common";
import { Curso } from "./Curso";
import { Horario } from "./Horario";
import { Materia } from "./Materia";
import { Personal } from "./Personal";

export class PlanillaHoraria{
    id!: number;
    dia!: string;
    hora_inicio!: Time;
    hora_fin!: Time;
    horario!: Horario;
    curso!: Curso;
    materia!: Materia;
    personal!: Personal;
}
