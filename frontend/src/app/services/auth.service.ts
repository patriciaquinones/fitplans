import { Injectable, inject } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
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

  async signUpWithEmailAndPassword(
    credential: Credential
  ): Promise<UserCredential> {
    try {
      const result = createUserWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      );
      // Get Firestore instance
      const db = getFirestore();

      // Add the user to the 'newUsers' collection
      await addDoc(collection(db, 'newuser'), {
        uid: (await result).user.uid,
        email: (await result).user.email,
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
      const docRef = doc(db, 'newuser', (await result).user.uid);
      const docSnap = await getDoc(docRef);
      // If the document exists, do not create it
      if (!docSnap.exists()) {
        // Add the user to the 'newUsers' collection
        await setDoc(docRef, {
          uid: result.user.uid,
          email: result.user.email,
          firstName: result.user.displayName,
        });
      }

      return result;
    } catch (error: any) {
      return error;
    }
  }
}