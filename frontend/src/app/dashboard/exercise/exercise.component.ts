import { Component, OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastifyService } from '../../services/toastify.service';

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

  constructor(
    private RoutineService: RoutineService,
    private route: ActivatedRoute,
    private toastifyService: ToastifyService
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

  //To add the exercise to the routine
  addExercise(): void {
    this.counter++;
    //To save the exercise in the firebase
    this.toastifyService.showToast('Se agrego el ejercicio a tu rutina. 🔥');
  }
}
