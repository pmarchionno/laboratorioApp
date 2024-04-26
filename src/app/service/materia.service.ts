import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materia } from '../model/Materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/materias";
  constructor(private http: HttpClient) { }

  public getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiServerUrl}/all`);
  }

  public findMateriaById(materiaId: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiServerUrl}/find/${materiaId}`);
  }

  public findByNombre(name: string): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiServerUrl}/find/name/${name}`);
  }

  public addMateria(materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(`${this.apiServerUrl}/add`, materia);
  }

  public updateMateria(id: number, materia: Materia): Observable<Materia> {
    return this.http.put<Materia>(`${this.apiServerUrl}/update`, materia);
  }

  public deleteMateria(materiaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${materiaId}`);
  }

  resetDataFormMateria(): Materia {
    return new Materia;
  }
}
