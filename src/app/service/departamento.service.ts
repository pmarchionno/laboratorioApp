import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../model/Departamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/departamentos";
  constructor(private http: HttpClient) { }

  public getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiServerUrl}/all`);
  }

  public findDepartamentoById(departamentoId: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiServerUrl}/find/${departamentoId}`);
  }

  public findByNombre(name: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiServerUrl}/find/name/${name}`);
  }

  public addDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.apiServerUrl}/add`, departamento);
  }

  public updateDepartamento(id: number, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiServerUrl}/update`, departamento);
  }

  public deleteDepartamento(departamentoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${departamentoId}`);
  }

  resetDataFormDepartamento(): Departamento {
    return new Departamento;
  }
}
