import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Add this import
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';  // <-- Add this import
import { MatSnackBarModule } from '@angular/material/snack-bar';  // <-- If you're using MatSnackBar
import { MatFormFieldModule } from '@angular/material/form-field';  // <-- Add this import
import { MatInputModule } from '@angular/material/input';  // <-- Add this import
import { MatButtonModule } from '@angular/material/button';  // <-- Add this import
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './login/login.component';  // <-- Your login component
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateDialogComponent } from './users/user-create-dialog/user-create-dialog.component';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { ClientList } from './clients/client-list/client-list';
import { ClientForm } from './clients/client-form/client-form';
import { FournisseurList } from './fournisseurs/fournisseur-list/fournisseur-list';
import { FournisseurForm } from './fournisseurs/fournisseur-form/fournisseur-form';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    ProfileComponent,
    UserListComponent,
    UserCreateDialogComponent,
    UserEditDialogComponent,
    ClientList,
    ClientForm,
    FournisseurList,
    FournisseurForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // <-- Include HttpClientModule here
    ReactiveFormsModule,  // <-- Include ReactiveFormsModule
    MatSnackBarModule,    // <-- If using MatSnackBar
    MatFormFieldModule,   // <-- Include MatFormFieldModule
    MatInputModule,       // <-- Include MatInputModule
    MatButtonModule,     // <-- Include MatButtonModule
    MatSelectModule, // Required for mat-select and mat-option
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule,
    // BrowserAnimationsModule // Required for Angular Material animations

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
