import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-create-dialog',
  standalone: false,
  templateUrl:'./user-create-dialog.component.html',
  styles: [`
    .dialog-form { padding: 20px; }
    mat-form-field { width: 100%; margin-bottom: 15px; }
    .buttons { display: flex; justify-content: flex-end; gap: 10px; }
  `]
})
export class UserCreateDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserCreateDialogComponent>
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['commercial', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe({
        next: user => {
          this.dialogRef.close(user);
        },
        error: err => console.error('Erreur création utilisateur', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
