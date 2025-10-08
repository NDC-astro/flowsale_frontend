import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/product.model';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductForm } from '../product-form/product-form';
import { StockMovementDialog } from '../stock-movement-dialog/stock-movement-dialog';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {
products: Produit[] = [];
  displayedColumns = ['code', 'nom', 'type', 'prix_ttc', 'stock', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductForm, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  openEditDialog(product: Produit): void {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '600px',
      data: product,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  openStockDialog(product: Produit): void {
    const dialogRef = this.dialog.open(StockMovementDialog, {
      width: '500px',
      data: product,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.snackBar.open('Produit supprimé', 'Fermer', { duration: 3000 });
          this.loadProducts();
        },
        error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
      });
    }
  }
}
