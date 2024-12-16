import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    const email = this.recoverForm.value.email;
    this.authService.recoverPassword(email).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Correo de recuperación enviado.',
          duration: 3000,
          color: 'success',
        });
        await toast.present();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: err.error.message || 'Error al enviar el correo.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }
}



