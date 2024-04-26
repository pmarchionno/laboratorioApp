import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personal } from '../model/Personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/personals";
  constructor(private http: HttpClient) { }

  public getPersonals(): Observable<Personal[]> {
    let personalList: Observable<Personal[]>;
    personalList = this.http.get<Personal[]>(`${this.apiServerUrl}/all`).pipe(
      map((personals: Personal[]) => {
        return personals.map((personal: Personal) => {
          personal.nombre_completo = personal.nombre + ' ' + personal.apellido;
          return personal;
        });
      })
    );

    return personalList;
  }

  public findPersonalById(personalId: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.apiServerUrl}/find/${personalId}`);
  }

  public findByNombre(name: string): Observable<Personal[]> {
    return this.http.get<Personal[]>(`${this.apiServerUrl}/find/name/${name}`);
  }

  public addPersonal(personal: Personal): Observable<Personal> {
    return this.http.post<Personal>(`${this.apiServerUrl}/add`, personal);
  }

  public updatePersonal(id: number, personal: Personal): Observable<Personal> {
    return this.http.put<Personal>(`${this.apiServerUrl}/update`, personal);
  }

  public deletePersonal(personalId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${personalId}`);
  }

  resetDataFormPersonal(): Personal {
    return new Personal;
  }
}
