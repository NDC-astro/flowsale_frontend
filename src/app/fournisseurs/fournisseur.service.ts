import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur.model';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = '${api_Url}/fournisseurs/';

  constructor(private http: HttpClient) {}

  getFournisseurs(params?: any): Observable<Fournisseur[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<Fournisseur[]>(this.apiUrl, { params: httpParams });
  }

  getFournisseur(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiUrl}${id}/`);
  }

  createFournisseur(fournisseur: Partial<Fournisseur>): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl, fournisseur);
  }

  updateFournisseur(id: number, fournisseur: Partial<Fournisseur>): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}${id}/`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
