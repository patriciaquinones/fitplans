import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any; // Define a property to store the user data

  // Your existing options array
  options = [
    { gender: 'Masculino' },
    { gender: 'Femenino' },
    { gender: 'Otro' },
  ];

  profileForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      birthday: [''],
      height: [0],
      weight: [0],
      gender: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    const uid = this.authService.getUserId();
    if (uid) {
      this.user = await this.authService.getUserData(uid);
      this.updateFormWithUserData();
    }
  }

  private updateFormWithUserData(): void {
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        birthday: this.user.birthday,
        height: this.user.height,
        weight: this.user.weight,
        gender: this.user.gender,
      });
    }
  }
  

  async updateProfile(): Promise<void> {
    const uid = this.authService.getUserId();
    if (uid) {
      const updatedProfileData = this.profileForm.value;
      await this.authService.updateUserProfile(uid, updatedProfileData);
      this.user = { ...this.user, ...updatedProfileData };
    }
  }
}
