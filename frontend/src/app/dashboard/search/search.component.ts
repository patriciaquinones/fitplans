import { Component, OnInit } from '@angular/core';
import { RoutineService } from '../../services/routine.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastifyService } from '../../services/toastify.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  search: FormGroup;
  page: number = 1;
  exercises: any = [];
  result: any = [];
  limit: number = 10;
  selectedFilter: string = '';

  constructor(
    private RoutineService: RoutineService,
    private fb: FormBuilder,
    private router: Router,
    private toastifyService: ToastifyService
  ) {
    this.search = this.fb.group({
      words: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      // Initial load with a limit
      this.exercises = await this.RoutineService.getExercises(0, this.limit);
      this.result = [...this.exercises];
    } catch (error) {
      console.error('Ocurrio un error al cargar los ejercicios: ', error);
      this.toastifyService.showToast(
        'Ocurrio un error al cargar los ejercicios, vuelve más tarde.'
      );
    }
  }

  //for the search bar
  async searching(): Promise<void> {
    try {
      if (this.search.value.words === '') {
        this.toastifyService.showToast(
          'Por favor ingresa el nombre del ejercicio.'
        );
        this.result = [...this.exercises];
      } else {
        const searchResult = await this.RoutineService.searchExercises(
          this.search.value.words
        );
        if (searchResult.length === 0) {
          this.toastifyService.showToast(
            'No se encontraron ejercicios con ese nombre.'
          );
          this.result = [...this.exercises];
        } else {
          this.result = searchResult;
        }
      }
    } catch (error) {
      console.error('Ocurrio un error al buscar los ejercicios: ', error);
    }
  }

  //To filter the exercises by body part
  async filter(filters: string[]): Promise<void> {
    for (let filter of filters) {
      this.result = await this.RoutineService.getFilteredExercises(filter);
    }
  }

  //To show more exercises
  async showMore(): Promise<void> {
    this.page++;
    // get the new exercises
    const newExercises = await this.RoutineService.getExercises(
      this.page * this.limit
    );
    this.result = this.result.concat(newExercises); // To add the new exercises to the existing ones

    //hide the button if there are no more exercises
    if (newExercises.length === 0) {
      document.getElementById('showMore')!.style.display = 'none';
    }
  }

  //To show the details of the exercise on the details page
  showDetails(id: string): void {
    this.router.navigate(['/exercise', id]);
  }
}
