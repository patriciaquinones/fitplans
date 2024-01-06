import { Component, OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastifyService } from '../../services/toastify.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent implements OnInit {
  result: any = [];
  counter: number = 0;

  // Method to add the exercise to the routine
  addExercise(): void {
    this.counter++;

    //to get the user id
    const userId = this.authService.getUserId();

    if (userId) {
      this.RoutineService.addExerciseToRoutine(this.result, userId);
    } else {
      this.toastifyService.showToast(
        'No se pudo agregar el ejercicio a tu rutina, intenta de nuevo más tarde. 😢'
      );
    }
  }

  constructor(
    private RoutineService: RoutineService,
    private route: ActivatedRoute,
    private toastifyService: ToastifyService,
    private authService: AuthService
  ) {}

  // To load the exercises
  async ngOnInit(): Promise<void> {
    try {
      // To get the exercise id
      const exerciseId = this.route.snapshot.paramMap.get('id') ?? '';
      this.result = await this.RoutineService.getExerciseById(exerciseId);
    } catch (error) {
      console.error(error);
    }
  }

  // Method to finish the exercise
  finishExercise() {
    this.RoutineService.finishExercise();
  }

  goBack() {
    //to go back to the previous page
    window.history.back();
  }
}
