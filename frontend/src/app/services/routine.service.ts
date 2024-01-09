import { Injectable, inject } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  limit,
  query,
  getDocs,
  serverTimestamp,
  orderBy,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { AuthService, Credential } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ToastifyService } from './toastify.service';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private completedExercisesCount: number = 0;
  private completedRoutinesCount: number = 0;
  private accumulatedMinutes: number = 0;
  private exercisesPerRoutineThreshold: number = 5; //pending

  private completedExercisesCountSubject = new BehaviorSubject<number>(0);
  completedExercisesCount$ = this.completedExercisesCountSubject.asObservable();

  private completedRoutinesCountSubject = new BehaviorSubject<number>(0);
  completedRoutinesCount$ = this.completedRoutinesCountSubject.asObservable();

  private accumulatedMinutesSubject = new BehaviorSubject<number>(0);
  accumulatedMinutes$ = this.accumulatedMinutesSubject.asObservable();

  constructor(
    private toastifyService: ToastifyService,
    private authService: AuthService
  ) {
    this.init();
  }

  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
  private headers = {
    'X-RapidAPI-Key': 'ba8ee74d5cmsh9a82cc7ab6c6173p1561abjsn543a2780c444',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  };

  private async fetchFromApi(endpoint: string): Promise<any> {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getExercises(offset: number = 0, limit = 10): Promise<any> {
    return this.fetchFromApi(`?offset=${offset}&limit=${limit}`);
  }

  async searchExercises(words: string, limit = 10): Promise<any> {
    return this.fetchFromApi(`/name/${words}?limit=${limit}`);
  }

  async getFilteredExercises(filtro: string, limit = 10): Promise<any> {
    return this.fetchFromApi(`/bodyPart/${filtro}?limit=${limit}`);
  }

  async getExerciseById(id: string): Promise<any> {
    const encodedId = encodeURIComponent(id);
    return this.fetchFromApi(`/exercise/${encodedId}`);
  }

  private async init(): Promise<void> {
    // listen for changes in the authentication state
    this.authService.authState$.subscribe((user) => {
      if (user) {
        //if the user is authenticated, load the data from Firestore
        this.loadCountsFromFirestore();
        this.getLastAddedExercise();
      } else {
        //if the user is not authenticated, clear the data
        this.clearUserProgressData();
      }
    });
  }

  private async loadCountsFromFirestore(): Promise<void> {
    try {
      const userId = this.authService.getUserId();

      if (userId) {
        const db = getFirestore();
        const userDocRef = doc(db, 'userRoutines', userId);

        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          this.completedExercisesCountSubject.next(
            data['completedExercisesCount'] || 0
          );
          this.completedRoutinesCountSubject.next(
            data['completedRoutinesCount'] || 0
          );
          this.accumulatedMinutesSubject.next(data['accumulatedMinutes'] || 0);
        }
      }
    } catch (error) {
      console.error('Error loading counts from Firestore:', error);
    }
  }

  private async saveCountsToFirestore(): Promise<void> {
    try {
      const userId = this.authService.getUserId();

      if (userId) {
        const db = getFirestore();
        const userDocRef = doc(db, 'userRoutines', userId);

        await setDoc(userDocRef, {
          completedExercisesCount: this.completedExercisesCountSubject.value,
          completedRoutinesCount: this.completedRoutinesCountSubject.value,
          accumulatedMinutes: this.accumulatedMinutesSubject.value,
        });
      }
    } catch (error) {
      console.error('Error saving counts to Firestore:', error);
    }
  }

  private clearUserProgressData(): void {
    this.completedExercisesCountSubject.next(0);
    this.completedRoutinesCountSubject.next(0);
    this.accumulatedMinutesSubject.next(0);
  }

  async addExerciseToRoutine(exercise: any, userId: string): Promise<void> {
    try {
      const exerciseWithTimestamp = {
        ...exercise,
        timestamp: serverTimestamp(),
      };

      const db = getFirestore();
      const userExercisesRef = collection(
        db,
        'userRoutines',
        userId,
        'exercises'
      );

      // Add the exercise to the 'exercises' collection
      await addDoc(userExercisesRef, exerciseWithTimestamp);

      // Update counts and show toast
      this.completedExercisesCount++;

      if (
        this.completedExercisesCount % this.exercisesPerRoutineThreshold ===
        0
      ) {
        await this.completeRoutine(userId); // Create a new routine document
        this.toastifyService.showToast('¡Rutina completada! 🎉');
        this.completedExercisesCount = 0;
      } else {
        this.toastifyService.showToast(
          'Se agregó el ejercicio a tu rutina. 🔥'
        );
      }

      // Save counts to Firestore
      this.saveCountsToFirestore();
    } catch (error) {
      console.error(error);
      console.error('Error en addExerciseToRoutine:', error);
      throw error;
    }
  }

  private async completeRoutine(userId: string): Promise<void> {
    try {
      const db = getFirestore();
      const userRoutinesRef = collection(
        db,
        'userRoutines',
        userId,
        'routines'
      );

      // Create a new routine document
      const routineData = {
        timestamp: serverTimestamp(),
      };

      await addDoc(userRoutinesRef, routineData);

      // Update completed routines count
      this.completedRoutinesCountSubject.next(
        this.completedRoutinesCountSubject.value + 1
      );

      this.saveCountsToFirestore();
    } catch (error) {
      console.error('Error in completeRoutine:', error);
      throw error;
    }
  }

  finishExercise() {
    // Increment the completed exercises count
    this.completedExercisesCountSubject.next(
      this.completedExercisesCountSubject.value + 1
    );
    this.toastifyService.showToast('¡Ejercicio completado! 🎉');

    //Check if the user has completed 5 exercises
    if (this.completedExercisesCountSubject.value % 5 === 0) {
      this.completedRoutinesCountSubject.next(
        this.completedRoutinesCountSubject.value + 1
      ); // Increment the completed routines count
    }

    // Accumulate 2 minutes for every exercise completed
    this.accumulatedMinutesSubject.next(
      this.accumulatedMinutesSubject.value + 2
    );

    // Save counts to Firestore
    this.saveCountsToFirestore();
  }

  // method` to get the last exercise added to the routine
  getCompletedExercisesCount(): number {
    return this.completedExercisesCount;
  }

  // Method to get the number of completed routines
  getCompletedRoutinesCount(): number {
    return this.completedRoutinesCount;
  }

  // Method to get the accumulated minutes
  getAccumulatedMinutes(): number {
    return this.accumulatedMinutes;
  }

  // Method to reset the accumulated minutes
  resetAccumulatedMinutes() {
    this.accumulatedMinutes = 0;
  }

  //get the last exercise added to the routine like above
  async getLastAddedExercise(): Promise<any> {
    try {
      const db = getFirestore();
      const userId = this.authService.getUserId();

      if (userId) {
        // To get the last exercise added to the routine
        const exercisesQuery = query(
          collection(db, 'userRoutines', userId, 'exercises'),
          orderBy('timestamp', 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(exercisesQuery);

        if (!querySnapshot.empty) {
          // get the last exercise added to the routine
          const lastExercise = querySnapshot.docs[0].data();
          return lastExercise;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}
