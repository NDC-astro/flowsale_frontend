// src/app/auth/role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRole = route.data['expectedRole'] as string;
    const userRole = this.authService.getUserRole();

    if (userRole === expectedRole) {
      return true; // Accès autorisé
    } else {
      // Afficher un message d’erreur
      this.snackBar.open('Accès refusé : rôle "${expectedRole}" requis.', 'Fermer', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });

      // Rediriger vers le dashboard ou page d’accueil
      return this.router.parseUrl('/dashboard');
    }
  }
}
