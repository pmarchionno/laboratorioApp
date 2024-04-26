import { Departamento } from "./Departamento";
import { PlanillaHoraria } from "./PlanillaHoraria";

export class Materia {
    id!: number;
    nombre!: string;
    departamento!: Departamento;
    planillaHoraria!: Array<PlanillaHoraria>;
}