import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ClientList } from './clients/client-list/client-list';
import { FournisseurList } from './fournisseurs/fournisseur-list/fournisseur-list';
import { ProductList } from './products/product-list/product-list';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data :{ expectedRole: 'admin' } // ← rôle attendu // ← Double protection : auth + rôle
  },
  { path: 'clients', component: ClientList,
    canActivate: [AuthGuard, RoleGuard],
    data : {expectedRole: 'commercial'}
  },
  { path: 'fournisseurs', component: FournisseurList,
    canActivate: [AuthGuard, RoleGuard],
    data: {expectedRole: 'gestionnaire'}
  },
  { path: 'produits', component: ProductList,
    canActivate: [AuthGuard, RoleGuard],
    data: {expectedRole: 'gestionnaire'}
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
