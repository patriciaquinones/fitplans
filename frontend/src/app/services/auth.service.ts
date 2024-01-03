import { Injectable, inject } from '@angular/core';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
import {
  Auth,
  AuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';

export interface Credential {
email: string;
password: string;
firstName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  readonly authState$ = authState(this.auth);

  async signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      );

      // Send email verification
      if (result.user) {
        await sendEmailVerification(result.user);
      }

      const db = getFirestore();
      await addDoc(collection(db, 'newuser'), {
        uid: result.user.uid,
        email: result.user.email,
        firstName: credential.firstName,
      });

      return result;
    } catch (error: any) {
      return error;
    }
  }


logInWithEmailAndPassword(credential: Credential) {
  return signInWithEmailAndPassword(
    this.auth,
    credential.email,
    credential.password
  );
}
  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  // google provider

signInWithGoogleProvider(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();

  return this.callPopUp(provider);
}

async callPopUp(provider: AuthProvider): Promise<UserCredential> {
  try {
    const result = await signInWithPopup(this.auth, provider);

    // Get Firestore instance
    const db = getFirestore();

    // Add the user to the 'newusers' collection
    await addDoc(collection(db, "newuser"), {
      uid: result.user.uid,
      email: result.user.email,
      firstName: result.user.displayName,

    });

    return result;
  } catch (error: any) {
    return error;
  }
}
  }
