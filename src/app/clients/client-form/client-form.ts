import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss'
})
export class ClientForm implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ClientForm>,
    @Inject(MAT_DIALOG_DATA) public client: Client | null
  ) {
    this.form = this.fb.group({
      raison_sociale: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      code_postal: ['', Validators.required],
      pays: ['Togo'],
      telephone: [''],
      email: ['', Validators.email],
      site_web: [''],
      statut: ['prospect', Validators.required],
      notes: ['']
    });

    if (this.client) {
      this.form.patchValue(this.client);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      if (this.client) {
        this.clientService.updateClient(this.client.id!, this.form.value).subscribe({
          next: client => this.dialogRef.close(client),
          error: err => console.error('Erreur mise à jour', err)
        });
      } else {
        this.clientService.createClient(this.form.value).subscribe({
          next: client => this.dialogRef.close(client),
          error: err => console.error('Erreur création', err)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
