import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GasResponse, GasDetails } from '../interfaces/gas-list.interface';

@Injectable({
  providedIn: 'root'
})
export class GasService {


  constructor(private http: HttpClient) { }

  getGasolineras():Observable<GasDetails[]>{
    console.log('ver gasolineras')

    return this.http.get<GasResponse>(`${environment.api_base_url}`).pipe(
      map((resp) => resp.ListaEESSPrecio),
      catchError(error => of([]))
    )
  }

}
