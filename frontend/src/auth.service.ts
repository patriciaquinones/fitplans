import { Injectable } from '@angular/core';
import { SupabaseClient,createClient } from '@supabase/supabase-js';
import {environment} from './environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private s_client: SupabaseClient;

  constructor() {
    this.s_client = createClient(environment.supabase.apiurl, environment.supabase.apikey);
  }

  // Register
signUp (email:string, password:string) {

  return this.s_client.auth.signUp({email,password
  });
}

//Login

signIn (email:string, password:string) {
  return this.s_client.auth.signInWithPassword({email,password
  });

}
}
