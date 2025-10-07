// src/app/clients/client.model.ts
export interface Client {
  id?: number;
  raison_sociale: string;
  adresse: string;
  ville: string;
  code_postal: string;
  pays: string;
  telephone?: string;
  email?: string;
  site_web?: string;
  statut: 'prospect' | 'client' | 'inactif';
  date_creation?: string;
  derniere_interaction?: string | null;
  notes?: string;
}

