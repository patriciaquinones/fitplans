import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UnitsChangeModalComponent } from './units-change-modal/units-change-modal.component';

@Component({
  selector: 'app-calories',
  standalone: true,
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css'],
  imports: [CommonModule, ReactiveFormsModule, UnitsChangeModalComponent],
})
export class CaloriesComponent {
  form: FormGroup;
  result: number | null = null;
  showUnitsChangeModal: boolean = false;
  selectedUnits: string = 'imperial';

  // Form options
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      units: ['imperial'], //Estos son campos de tablas para la base de datos de firebase
      gender: ['femenino'],
      age: [null],
      height: [null],
      weight: [null],
      activity: ['sedentario'],
      goal: ['perder'],
    });
  }

  calculateCalories() {
    // Get form values
    const formValues = this.form.value;

    // To calculate calories, we need to define the following values:
    const age = formValues.age;
    const height = formValues.height;
    const weight = formValues.weight;
    const gender = formValues.gender;
    const activity = formValues.activity;
    const goal = formValues.goal;

    //Check for empty or null fields and assign default values if necessary
    const parsedAge = age !== null && age !== '' ? parseFloat(age) : 0;
    let parsedHeight =
      height !== null && height !== '' ? parseFloat(height) : 0;
    let parsedWeight =
      weight !== null && weight !== '' ? parseFloat(weight) : 0;

    // Convert pounds to kg if imperial
    if (formValues['units'] === 'imperial') {
      parsedWeight = Math.floor(parsedWeight / 2.205); 
    }

    // The Harris-Benedict equations revised by Roza and Shizgal(1984:2) Just in case --_--
    let rmb: number;
    if (gender === 'femenino') {
      rmb =
        447.593 +
        (9.247 * parsedWeight) +
        (3.098 * parsedHeight) -
        (4.33 * parsedAge);
    } else {
      rmb =
        88.362 +
        (13.397 * parsedWeight) +
        (4.799 * parsedHeight) -
        (5.677 * parsedAge);
    }

    // setup activity factor
    let activityFactor = 1.2; // Default value for sedentary
    switch (activity) {
      case 'ligero':
        activityFactor = 1.375;
        break;
      case 'moderado':
        activityFactor = 1.55;
        break;
      case 'activo':
        activityFactor = 1.725;
        break;
      case 'muy activo':
        activityFactor = 1.9;
        break;
    }

    // Calculate total calories
    const totalCalories = rmb * activityFactor;

    // setup goal factor
    switch (goal) {
      case 'perder':
        this.result = Math.round(totalCalories - 500);
        break;
      case 'mantener':
        this.result = Math.round(totalCalories);
        break;
      case 'ganar':
        this.result = Math.round(totalCalories + 500);
        break;
    }
  }

  // This method is called when the user clicks on one of the units button
  openUnitsChangeModal(): void {
    this.showUnitsChangeModal = true;
  }

  // This method is called when the user clicks the "Close" button in the modal
  closeUnitsChangeModal(): void {
    this.showUnitsChangeModal = false;
  }

  // This method is called when the user changes the units in the form
  onUnitsChange(): void {
    const currentUnits = this.form.get('units')?.value;
  
    // If the units have changed, open the modal
    if (currentUnits !== this.selectedUnits) {
      this.selectedUnits = currentUnits;
  
      // To avoid sh..., just in case:
      if (currentUnits === 'imperial' || currentUnits === 'metric') {
        this.openUnitsChangeModal();
      }
    }
  }
}
