import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  roles = [
    { value: 'admin', label: 'Administrateur' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'gestionnaire', label: 'Gestionnaire de stock' }
  ];

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      email: ['', [Validators.email]],
      phone: [''],
      role: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  onSubmit(): void {
  if (this.profileForm.valid) {
    const formData = this.profileForm.getRawValue(); // Use getRawValue to include disabled fields
    console.log('Submitting data:', formData);
    this.profileService.updateProfile(formData).subscribe({
      next: () => this.snackBar.open('Profil mis à jour avec succès', 'Fermer', { duration: 3000 }),
      error: (error) => {
        console.error('Update error:', error); // Log the error details
        this.snackBar.open('Erreur lors de la mise à jour: ' + error.message, 'Fermer', { duration: 3000 });
      }
    });
  }
}
}
