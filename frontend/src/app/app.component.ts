import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    CarouselModule,
  ],
})
export class AppComponent {
  title = 'fitplans';

  // Carousel images and info (Should be moved to the database)
  images: any[] = [
    {
      image: './assets/images/spencer.svg',
      alt: 'Hombre asiatico con pelo negro tomando agua',
      title: 'Spencer Lopez, Director ejecutivo',
      text: '¡Fitplans+ ha transformado por completo mi rutina de ejercicios! La variedad de programas me permite personalizar mi entrenamiento, ya sea para perder peso, ganar músculo o tonificar. Además, la versión premium con la dieta nutricional ha llevado mis resultados al siguiente nivel. ¡Estoy encantado con los cambios positivos en mi cuerpo y mi salud!',
    },
    {
      image: './assets/images/julia.svg',
      alt: 'Mujer con cabello rubio sonriendo',
      title: 'Julia García, Diseñadora Gráfica',
      text: 'Como diseñadora, mi día a día suele ser sedentario. Fitplans+ ha sido mi salvación. Los entrenamientos personalizados se adaptan a mi apretada agenda, y la variedad de ejercicios mantiene mi rutina interesante. ¡Me encanta cómo ha mejorado mi energía y concentración en el trabajo!',
    },
    {
      image: './assets/images/raul.svg',
      alt: 'Hombre afroamericano',
      title: 'Raúl Martínez, Ingeniero de Software',
      text: 'Fitplans+ ha sido la clave para mantenerme en forma mientras trabajo en proyectos intensos. Los programas de entrenamiento eficientes me permiten ejercitarme incluso en los días más ocupados. La opción de seguimiento de progreso también ha sido motivadora. ¡Estoy más fuerte y enérgico que nunca!',
    },
    {
      image: './assets/images/natalia.svg',
      alt: 'Mujer con ropa deportiva sosteniendo una botella de agua',
      title: 'Natalia Rodríguez, Estudiante',
      text: 'Como estudiante de medicina, el estrés es constante. Fitplans+ no solo me ayuda a mantenerme físicamente activa, sino que también mejora mi bienestar mental. Los programas de yoga y meditación son perfectos para relajarme después de largas horas de estudio. ¡Estoy agradecida por los beneficios holísticos!',
    },
  ];
}
