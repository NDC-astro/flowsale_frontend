import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit-dialog',
  standalone:false,
  templateUrl: `./user-edit-dialog.component.html`,
  styles: [`
    .dialog-form { padding: 20px; }
    mat-form-field { width: 100%; margin-bottom: 15px; }
    .buttons { display: flex; justify-content: flex-end; gap: 10px; }
  `]
})
export class UserEditDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public  user:User
  ) {
    this.form = this.fb.group({
      username: [user.username, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      role: [user.role, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.updateUser(this.user.id, this.form.value).subscribe({
        next: user => {
          this.dialogRef.close(user);
        },
        error: err => console.error('Erreur mise à jour', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
