import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Horario } from '../model/Horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/horarios";
  constructor(private http: HttpClient) { }

  public getHorarios(): Observable<Horario[]>{
    return this.http.get<Horario[]>('${this.apiServerUrl}/all')
  }

  public findHorarioById(horarioId: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiServerUrl}/find/${horarioId}`);
  }

  public findByNombre(name: string): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiServerUrl}/find/name/${name}`);
  }

  public addHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(`${this.apiServerUrl}/add`, horario);
  }

  public updateHorario(id: number, horario: Horario): Observable<Horario> {
    return this.http.put<Horario>(`${this.apiServerUrl}/update`, horario);
  }

  public deleteHorario(horarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${horarioId}`);
  }

  resetDataFormHorario(): Horario {
    return new Horario;
  }
}
