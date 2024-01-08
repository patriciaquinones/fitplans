import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  user: any;

  // per default
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

  ngOnInit(): void {
    this.authService.authenticationChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.refreshUserData();
        } else {
          //redirect to login later
        }
      });
  }

  private refreshUserData(): void {
    const uid = this.authService.getUserId();
    if (uid) {
      this.authService.getUserData(uid)
        .then((userData) => {
          this.user = userData;
          this.updateFormWithUserData();
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    // after the view is initialized call the function to load the user data
    this.initializeUserData();
  }

  private async initializeUserData(): Promise<void> {
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
