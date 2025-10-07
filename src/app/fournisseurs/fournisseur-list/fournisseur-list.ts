import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur.model';
import { FournisseurService } from '../fournisseur.service';
import { FournisseurForm } from '../fournisseur-form/fournisseur-form';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fournisseur-list',
  standalone: false,
  templateUrl: './fournisseur-list.html',
  styleUrl: './fournisseur-list.scss'
})
export class FournisseurList implements OnInit {
  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  displayedColumns = ['raison_sociale', 'email', 'telephone', 'produit_fourni', 'actions'];
  searchTerm = '';
  searchProduit = '';

  constructor(
    private fournisseurService: FournisseurService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(fournisseurs => {
      this.fournisseurs = fournisseurs;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredFournisseurs = this.fournisseurs.filter(f => {
      const matchesSearch = !this.searchTerm ||
        f.raison_sociale.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        f.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        f.telephone?.includes(this.searchTerm);
      const matchesProduit = !this.searchProduit ||
        f.produit_fourni?.toLowerCase().includes(this.searchProduit.toLowerCase());
      return matchesSearch && matchesProduit;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FournisseurForm, { width: '600px', height: '600px' });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) this.loadFournisseurs();
    });
  }

  openEditDialog(fournisseur: Fournisseur): void {
    const dialogRef = this.dialog.open(FournisseurForm, {
      width: '600px', height: '600px',
      data: fournisseur
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) this.loadFournisseurs();
    });
  }

  deleteFournisseur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseurService.deleteFournisseur(id).subscribe({
        next: () => {
          this.snackBar.open('Fournisseur supprimé', 'Fermer', { duration: 3000 });
          this.loadFournisseurs();
        },
        error: () => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 })
      });
    }
  }
}
