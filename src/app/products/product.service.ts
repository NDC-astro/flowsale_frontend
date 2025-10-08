import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit, Categorie, MouvementStock } from '../models/product.model';

import { api_Url } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = api_Url;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}/produits/`);
  }

  getProduct(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/produits/${id}/`);
  }

  createProduct(product: Partial<Produit>): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl}/produits/`, product);
  }

  updateProduct(id: number, product: Partial<Produit>): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/produits/${id}/`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/produits/${id}/`);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories/`);
  }

  createMouvement(productId: number, mouvement: Partial<MouvementStock>): Observable<MouvementStock> {
    return this.http.post<MouvementStock>(`${this.baseUrl}/produits/${productId}/mouvement/`, mouvement);
  }
}
