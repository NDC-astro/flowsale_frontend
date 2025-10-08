import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categorie, Produit } from '../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm implements OnInit {
form: FormGroup;
  categories: Categorie[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductForm>,
    @Inject(MAT_DIALOG_DATA) public  produit: Produit | null
  ) {
    this.isEditMode = !!produit;
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(50)]],
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      type: ['produit', Validators.required],
      categorie: [null],
      prix_unitaire_ht: [0, [Validators.required, Validators.min(0)]],
      taux_tva: [20.00, [Validators.required, Validators.min(0), Validators.max(100)]],
      quantite_stock: [0, [Validators.required, Validators.min(0)]],
      seuil_alerte: [5, [Validators.required, Validators.min(0)]],
      actif: [true]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    if (this.produit) {
      this.form.patchValue(this.produit);
    }
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const productData = this.form.value;
      if (this.isEditMode) {
        this.productService.updateProduct(this.produit!.id!, productData).subscribe({
          next: () => this.dialogRef.close(true),
          error: err => console.error('Erreur mise à jour', err)
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => this.dialogRef.close(true),
          error: err => console.error('Erreur création', err)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
