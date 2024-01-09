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

import { browserSessionPersistence, setPersistence } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

export interface Credential {
  email: string;
  password: string;
  firstName?: string;
  isPremium: boolean;
}

interface UserData {
  email: string;
  firstName?: string;
  isPremium: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private userData: any;
  readonly authState$ = authState(this.auth);
  private readonly USER_DATA_KEY = 'userData';

 // To notify other components when the user's authentication state changes
 private authenticationChanged = new BehaviorSubject<boolean>(false);

 // to subscribe to changes in the user's authentication state
 authenticationChanged$ = this.authenticationChanged.asObservable();

 constructor(private ToastifyService: ToastifyService, auth: Auth) {
   this.auth = auth;

   // Configure session persistence
   setPersistence(this.auth, browserSessionPersistence)
     .then(() => {
     })
     .catch((error) => {
     });

   // Listen for changes to the user's authentication state
   this.authState$.subscribe((user) => {
     if (user) {
       this.getUserId();
       // notify changes in the authentication state
       this.authenticationChanged.next(true);
     } else {
       this.authenticationChanged.next(false);
     }
   });
 }

  isAuthenticated(): boolean {
    // use the observable to check if the user is authenticated
    const user: User | null = this.auth.currentUser;
    return user ? true : false;
  }

  getUserId(): string | null {
    const user: User | null = this.auth.currentUser;
    return user ? user.uid : null;
  }

  async getUserName(): Promise<string | null> {
    const userId = this.getUserId();
    if (userId) {
      const userData = await this.getUserData(userId);
      return userData?.firstName || null;
    }
    return null;
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
        isPremium: false,
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
    this.ToastifyService.showToast('Sesión cerrada. Hasta luego!👋');
    // Clear the user data from the service when the user logs out
    this.userData = null;
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
          isPremium: false,
        });
      }

      return result;
    } catch (error: any) {
      return error;
    }
  }

  async getUserData(uid: string): Promise<any> {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'newuser', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        this.userData = userData;
        return userData;
      } else {
        return null;
      }
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        this.ToastifyService.showToast('Ocurrio un error inesperado.');
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.getUserData(uid);
      }
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

  // when a user subscribes to a premium plan
  async upgradeToPremium(uid: string): Promise<void> {
    const db = getFirestore();
    const userRef = doc(db, 'newuser', uid);

    // Update the user's profile to mark them as a premium user
    await updateDoc(userRef, { isPremium: true });
  }

  // this function is called when a user unsubscribes from a premium plan
  async downgradeFromPremium(uid: string): Promise<void> {
    const db = getFirestore();
    const userRef = doc(db, 'newuser', uid);

    // Update the user's profile to mark them as a non-premium user
    await updateDoc(userRef, { isPremium: false });
  }

  // this function is called when a user logs in and we need to check if they are premium
  async getIsPremium(): Promise<boolean> {
    const userId = this.getUserId();
    if (userId) {
      const userData = await this.getUserData(userId);
      return userData?.isPremium || false;
    }
    return false;
  }
}
