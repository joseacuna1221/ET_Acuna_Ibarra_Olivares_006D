import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router // Inyectar Router
  ) {
    this.resetForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    const { token, newPassword } = this.resetForm.value;

    this.authService.resetPassword(token, newPassword).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Contraseña restablecida correctamente.',
          duration: 3000,
          color: 'success',
        });
        await toast.present();

        // Redirigir al login
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: err.error.message || 'Error al restablecer contraseña.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }
}



