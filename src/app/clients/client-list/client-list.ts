import { Component, OnInit } from '@angular/core';
import { ClientForm } from '../client-form/client-form';
import { ClientService } from '../client.service';
import { Client } from '../../models/client.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss'
})
export class ClientList implements OnInit {

  clients: Client[] = [];
  filteredClients: Client[] = [];
  displayedColumns = ['raison_sociale', 'email', 'telephone', 'statut', 'actions'];
  searchTerm = '';
  selectedStatut = '';

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredClients = this.clients.filter(client => {
      const matchesSearch = !this.searchTerm ||
        client.raison_sociale.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        client.telephone?.includes(this.searchTerm);
      const matchesStatut = !this.selectedStatut || client.statut === this.selectedStatut;
      return matchesSearch && matchesStatut;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ClientForm, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadClients();
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientForm, {
      width: '600px',
      data: client
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadClients();
    });
  }

  deleteClient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.snackBar.open('Client supprimé', 'Fermer', { duration: 3000 });
          this.loadClients();
        },
        error: () => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 })
      });
    }
  }

  getStatutLabel(statut: string): string {
    const labels: { [key: string]: string } = {
      'prospect': 'Prospect',
      'client': 'Client',
      'inactif': 'Inactif'
    };
    return labels[statut] || statut;
  }

  getStatutColor(statut: string): string {
    const colors: { [key: string]: string } = {
      'prospect': 'accent',
      'client': 'primary',
      'inactif': 'warn'
    };
    return colors[statut] || 'default';
  }
}
