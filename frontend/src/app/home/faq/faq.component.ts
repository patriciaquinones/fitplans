import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  // FAQ data (Should be fetched from a database)
  faqs = [
    {
      question: '¿Cómo puedo acceder a la dieta nutricional premium?',
      answer: 'Inmediatamente obtengas el plan premium se habilitará el área de Dieta Nutricional en el Panel principal.'
    },
    {
      question: '¿Cómo puedo personalizar mi rutina de ejercicios?',
      answer: 'En la sección de Buscar, encontrarás opciones para personalizar y ajustar tu rutina de ejercicios según tus objetivos y preferencias.'
    },
    {
      question: '¿El plan gratuito es para siempre ó debo de pagarlo?',
      answer: 'Por el momento no tiene límite de tiempo, puedes utilizarlo de forma gratuita el tiempo que desees.'
    },
    {
      question: '¿Puedo utilizar Fitplans+ si soy principiante en el fitness?',
      answer: 'Sí, FitPlans+ está diseñado tanto para principiantes como para expertos que deseen mantener su cuerpo en forma.'
    }
  ];
}
