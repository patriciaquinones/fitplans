import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';





export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"fitplans","appId":"1:185348207581:web:7cc6049998fe5248f8fc34","databaseURL":"https://fitplans-default-rtdb.firebaseio.com","storageBucket":"fitplans.appspot.com","apiKey":"AIzaSyCBkmatsfMqG1Z08LFiFOSKTHrUUFR_OsQ","authDomain":"fitplans.firebaseapp.com","messagingSenderId":"185348207581"}))), importProvidersFrom(provideAuth(() => getAuth()))]
};

