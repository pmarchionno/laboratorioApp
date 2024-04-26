import { Injectable } from '@angular/core';
import { PlanillaHoraria } from '../model/PlanillaHoraria';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanillaHorariaService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/planilla-horaria";
  constructor(private http: HttpClient) { }

  public getPlanillaHorarias(): Observable<PlanillaHoraria[]> {
    return this.http.get<PlanillaHoraria[]>(`${this.apiServerUrl}/all`);
  }

  public findPlanillaHorariaById(planillaHorariaId: number): Observable<PlanillaHoraria> {
    return this.http.get<PlanillaHoraria>(`${this.apiServerUrl}/find/${planillaHorariaId}`);
  }

  public findByNombre(name: string): Observable<PlanillaHoraria[]> {
    return this.http.get<PlanillaHoraria[]>(`${this.apiServerUrl}/find/name/${name}`);
  }

  public addPlanillaHoraria(planillaHoraria: PlanillaHoraria): Observable<PlanillaHoraria> {
    return this.http.post<PlanillaHoraria>(`${this.apiServerUrl}/add`, planillaHoraria);
  }

  public updatePlanillaHoraria(id: number, planillaHoraria: PlanillaHoraria): Observable<PlanillaHoraria> {
    return this.http.put<PlanillaHoraria>(`${this.apiServerUrl}/update`, planillaHoraria);
  }

  public deletePlanillaHoraria(planillaHorariaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${planillaHorariaId}`);
  }

  resetDataFormPlanillaHoraria(): PlanillaHoraria {
    return new PlanillaHoraria;
  }
}
