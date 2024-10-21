import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../services/userauth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerForm: FormGroup;
  usuariosino: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: UserauthService,
    private router: Router,
    private toastController: ToastController
  ) { 
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      rut: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      profilePicture: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() { }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('confirmPassword')!.value
      ? null : { 'passwordMismatch': true };
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password, name, age, rut, dob, gender, profilePicture } = this.registerForm.value;
  
      this.authService.GetUserByUsername(username).subscribe(async (response) => {
  
        // no me funcionaba y le pedi ayuda a mi tata (gpt) y me dejo con esto
        if (Array.isArray(response) && response.length > 0) {
          this.usuariosino = true;
          const toast = await this.toastController.create({
            message: 'El nombre de usuario ya existe',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
          return;
        } else {
          this.usuariosino = false;

          this.authService.register({ username, email, password, name, age, rut, dob, gender, profilePicture }).subscribe(
            async (response) => {
              const toast = await this.toastController.create({
                message: 'Usuario registrado con éxito',
                duration: 2000,
                color: 'success'
              });
              toast.present();
              this.router.navigate(['/start']);
            },
            async (error) => {
              const toast = await this.toastController.create({
                message: 'Error en el registro',
                duration: 2000,
                color: 'danger'
              });
              toast.present();
            }
          );
        }
      });
    }
  }   
}
