import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../fournisseur.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from '../../models/fournisseur.model';

@Component({
  selector: 'app-fournisseur-form',
  standalone: false,
  templateUrl: './fournisseur-form.html',
  styleUrl: './fournisseur-form.scss'
})
export class FournisseurForm implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private dialogRef: MatDialogRef<FournisseurForm>,
    @Inject(MAT_DIALOG_DATA) public fournisseur :  Fournisseur | null
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
      produit_fourni: [''],
      notes: ['']
    });

    if (this.fournisseur) {
      this.form.patchValue(this.fournisseur);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      if (this.fournisseur) {
        this.fournisseurService.updateFournisseur(this.fournisseur.id!, this.form.value).subscribe({
          next: fournisseur => this.dialogRef.close(fournisseur),
          error: err => console.error('Erreur mise à jour', err)
        });
      } else {
        this.fournisseurService.createFournisseur(this.form.value).subscribe({
          next: fournisseur => this.dialogRef.close(fournisseur),
          error: err => console.error('Erreur création', err)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
