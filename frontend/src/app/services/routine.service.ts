import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
  private headers = {
    'X-RapidAPI-Key': '1c2577cea6msh77c7933b47f0c0fp16caf9jsnec08502729a1',
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
}
