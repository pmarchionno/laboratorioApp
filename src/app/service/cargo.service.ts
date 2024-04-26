import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ECargo } from '../model/ECargo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/cargos";
  constructor(private http: HttpClient) { }

  public getCargos(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/all`);
  }
}
