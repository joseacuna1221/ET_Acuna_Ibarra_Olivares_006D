import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserauthService } from '../services/userauth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  editProfileForm: FormGroup;
  currentUser!: Users;

  constructor(
    private fb: FormBuilder,
    private userAuthService: UserauthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.editProfileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      profilePicture: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userIdString = sessionStorage.getItem('id');
    if (userIdString) {
      const userId = Number(userIdString);
      this.userAuthService.GetUserById(userId).subscribe((response) => {
        this.currentUser = response;
        this.editProfileForm.patchValue(this.currentUser);
      });}
  }
  

  onUpdate() {
    if (this.editProfileForm.valid) {
      const userId = this.currentUser.id;
      const updatedData = this.editProfileForm.value;

      this.userAuthService.updateUser(userId, updatedData).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: 'Perfil actualizado con éxito',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          this.router.navigate(['/tabs/tab1']);
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Error al actualizar el perfil',
            duration: 2000,
            color: 'danger',
          });
          toast.present();
        }
      );
    }
  }
}
