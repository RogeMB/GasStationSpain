import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GasResponse, ListaEESSPrecio } from '../interfaces/gas-list.interface';

@Injectable({
  providedIn: 'root'
})
export class GasService {


  constructor(private http: HttpClient) { }

  getGasolineras():Observable<ListaEESSPrecio []>{
    console.log('ver gasolineras')

    return this.http.get<GasResponse>(`${environment.production}/}`).pipe(
      map((resp) => resp.ListaEESSPrecio),
      catchError(error => of([]))
    )
  }

}
