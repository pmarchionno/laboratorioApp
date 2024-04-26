import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../model/Curso';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/cursos";
  constructor(private http: HttpClient) { }

  public getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiServerUrl}/all`);
  }

  public findCursoById(cursoId: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiServerUrl}/find/${cursoId}`);
  }

  public findByNombre(name: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiServerUrl}/find/name/${name}`);
  }

  public addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiServerUrl}/add`, curso);
  }

  public updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiServerUrl}/update`, curso);
  }

  public deleteCurso(cursoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${cursoId}`);
  }

  resetDataFormCurso(): Curso {
    return new Curso;
  }
}
