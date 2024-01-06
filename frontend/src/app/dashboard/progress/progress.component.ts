import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent implements OnInit {
  lastExercise: any = null;

  completedExercisesCount = 0;
  completedRoutinesCount = 0;
  accumulatedMinutes = 0;
  formattedHours: string = '0h 0min';

  private formatHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }

  constructor(private routineService: RoutineService) {}

  // to load the progress
  async ngOnInit(): Promise<void> {
    this.routineService.completedExercisesCount$.subscribe((count) => {
      this.completedExercisesCount = count;
    });

    this.routineService.completedRoutinesCount$.subscribe((count) => {
      this.completedRoutinesCount = count;
    });

    this.routineService.accumulatedMinutes$.subscribe((minutes) => {
      this.accumulatedMinutes = minutes;
      this.formattedHours = this.formatHours(minutes);
    });

    try {
      this.lastExercise = await this.routineService.getLastAddedExercise();
    } catch (error) {
      console.error('Error en progress:', error);
    }
  }

  finishExercise() {
    this.routineService.finishExercise();
  }
}
