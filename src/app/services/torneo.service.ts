import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {
  private apiUrl = 'http://localhost:8080/api/torneos';

  constructor(private http: HttpClient) {}

  getTorneos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos`);
  }

  crearTorneo(torneo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, torneo);
  }
}
