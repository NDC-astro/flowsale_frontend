export interface Categorie {
  id?: number;
  nom: string;
  description?: string;
}

export interface Produit {
  id: number;
  code: string;
  nom: string;
  description?: string;
  type: 'produit' | 'service';
  categorie?: number; // ID
  categorie_obj?: Categorie; // optionnel, pour affichage
  prix_unitaire_ht: number;
  taux_tva: number;
  prix_ttc?: number;
  quantite_stock: number;
  seuil_alerte: number;
  actif: boolean;
  date_creation?: string;
}

export interface MouvementStock {
  id: number;
  produit: number;
  type_mouvement: 'entree' | 'sortie' | 'ajustement';
  quantite: number;
  date_mouvement?: string;
  commentaire?: string;
  cree_par?: string;
}
