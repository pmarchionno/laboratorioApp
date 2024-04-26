import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registro } from '../model/Registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiServerUrl = environment.apiUrl + "/laboratorio/registros";
  constructor(private http: HttpClient) { }

  public getRegistros(): Observable<Registro[]>{
    return this.http.get<Registro[]>(`${this.apiServerUrl}/all`)
    // .pipe(
    //   map(registros => this.formatDate(registros))
    // )
    ;
  }

  private formatDate(registros: Registro[]): Registro[] {
    return registros.map(registro => {
      // try {
      //   const parsedDate = this.datePipe.transform(registro.fecha, 'dd/MM/yyyy');
      //   registro.fecha = new Date (this.datePipe.transform(parsedDate, 'dd/MM/yyyy')!);
      // } catch (error) {
        
      // }
      return registro;
    });
  }

  public findRegistroById(registroId: number): Observable<Registro> {
    return this.http.get<Registro>(`${this.apiServerUrl}/find/${registroId}`);
  }

  public addRegistro(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(`${this.apiServerUrl}/add`, registro);
  }

  public updateRegistro(id: number, registro: Registro): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiServerUrl}/update`, registro);
  }

  public deleteRegistro(registroId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${registroId}`);
  }

  resetDataFormRegistro(): Registro {
    return new Registro;
  }
}
function moment(fecha: Date) {
  throw new Error('Function not implemented.');
}

