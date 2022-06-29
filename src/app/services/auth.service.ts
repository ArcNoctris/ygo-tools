import { Injectable } from '@angular/core';
//import { Auth } from '@angular/fire/auth'
//import { Firestore, DocumentReference } from '@angular/fire/firestore'
import { FirebaseApp } from '@firebase/app'
import '@firebase/auth'
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//import { User } from './user.model'


import { Component } from '@angular/core';
import { getAuth, GoogleAuthProvider, Auth, signInWithRedirect, getRedirectResult, signInWithPopup , signInWithCredential} from '@angular/fire/auth';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  user$: any;
  auth = getAuth()


  constructor(
    private afa: Auth,
    private afs: Firestore,
    private router: Router,

  ) {
    console.log(this.afa.currentUser)

    //this.user$ = this.afa.authState.pipe(switchMap(user => {
    //if (user) {

    //return this.afs.doc<any>(`user/${user.uid}`).valueChanges();
    //} else {
    // return of(null)
    //}
    //})
    //);
  }
  async googleSignIn(token:string): Promise<void> {
   
    await signInWithCredential(this.auth, GoogleAuthProvider.credential(token))
  


    //return this.updateUserData(credential.user);
  }
  async signOut() {
    await this.afa.signOut()
    return this.router.navigate(['/'])
  }
  private updateUserData(user: any) {
    //const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    //return userRef.set(data, {merge:true})
  }

}
