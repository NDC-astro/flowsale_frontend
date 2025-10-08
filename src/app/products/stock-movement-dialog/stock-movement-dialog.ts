import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { Produit } from '../../models/product.model';

@Component({
  selector: 'app-stock-movement-dialog',
  standalone: false,
  templateUrl: './stock-movement-dialog.html',
  styleUrl: './stock-movement-dialog.scss'
})
export class StockMovementDialog {
form: FormGroup;
  currentStock: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<StockMovementDialog>,
    @Inject(MAT_DIALOG_DATA) public  produit: Produit
  ) {
    this.currentStock = produit.quantite_stock;
    this.form = this.fb.group({
      type_mouvement: ['entree', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      commentaire: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const mouvement = this.form.value;
      this.productService.createMouvement(this.produit.id, mouvement).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => {
          console.error('Erreur mouvement stock', err);
          alert('Erreur : quantité insuffisante pour une sortie.');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
