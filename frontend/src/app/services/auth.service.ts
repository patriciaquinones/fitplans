import { Injectable, inject } from '@angular/core';
import { ToastifyService } from './toastify.service';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  Auth,
  AuthProvider,
  GoogleAuthProvider,
  User,
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

  constructor(private ToastifyService: ToastifyService) {}

  getUserId(): string | null {
    const user: User | null = this.auth.currentUser;
    return user ? user.uid : null;
  }

  async signUpWithEmailAndPassword(
    credential: Credential
  ): Promise<UserCredential> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        credential.email,
        credential.password
      );
      // Get Firestore instance
      const db = getFirestore();
      const uid = result.user.uid;

      // Use the UID as the document ID
      await setDoc(doc(db, 'newuser', uid), {
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

  async getUserData(uid: string): Promise<any> {
    const db = getFirestore();
    const docRef = doc(db, 'newuser', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async updateUserProfile(uid: string, profileData: any): Promise<void> {
    const db = getFirestore();
    const docRef = doc(db, 'newuser', uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Update the document only if it exists
      await updateDoc(docRef, profileData);
      this.ToastifyService.showToast('Perfil actualizado correctamente 🎉');
    } else {
      // Handle the case where the document does not exist (optional)
      console.error('User document does not exist.');
    }
  }
}
