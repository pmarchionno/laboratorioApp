import { Curso } from "./Curso";
import { Materia } from "./Materia";
import { Personal } from "./Personal";

export class Registro{
    id!: number;
    fecha!: Date;
    hora_inicio!: string;
    hora_fin!: string;
    detalle!: string;
    curso!: Curso;
    materia!: Materia;
    personal!: Personal;
}
