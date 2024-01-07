 // translation.service.ts
     import { Injectable } from '@angular/core';
     import { HttpClient } from '@angular/common/http';
     import { Observable } from 'rxjs';


 @Injectable({
   providedIn: 'root',
 })
 export class TranslationService {
   private translations: Record<string, string> = {};

   setTranslations(translations: Record<string, string>): void {
     this.translations = translations;
   }

   translate(key: string): string {
     return this.translations[key] || key;
   }
 }
 