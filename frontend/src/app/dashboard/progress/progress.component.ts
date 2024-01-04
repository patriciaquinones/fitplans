import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})

//Dont add this to the database
export class ProgressComponent {
  lastExercise = [
    {
      image: '../../../assets/images/lastExercise.svg',
      title: 'Ejercicios de hombros',
      level: 'Avanzado',
    },
  ];
}
