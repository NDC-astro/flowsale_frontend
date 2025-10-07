// src/app/fournisseurs/fournisseur.model.ts
export interface Fournisseur {
  id?: number;
  raison_sociale: string;
  adresse: string;
  ville: string;
  code_postal: string;
  pays: string;
  telephone?: string;
  email?: string;
  site_web?: string;
  produit_fourni?: string;
  date_ajout?: string;
  notes?: string;
} 
