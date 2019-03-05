//-----This service manage the methods for user login and register.

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, first } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from './models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

      // this.user$ = this.afsAuth.authState.pipe(
      //   switchMap(user => {
      //     if (user) {
      //       return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      //     } else {
      //       return of(null);
      //     }
      //   })
      // );
  }

  //  private updateUserData(user$){
  //     this.user$ = this.afsAuth.authState.pipe(
  //       switchMap(user => {
  //         if (user) {
  //           return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
  //         } else {
  //           return of(null);
  //         }
  //       })
  //     );
  //  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      name: ''  // Crear aqui el insert de este name
    }
    console.log('DATA', data);
    return userRef.set(data, { merge: true })
  }

  getUser(){
    return this.user.pipe(first()).toPromise();
  }

  //-----Methods to work with firebase.
  registerUser(email: string, pass: string){
    return new Promise ((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass) // TODO: add name to the register method
      .then( userData => {
        resolve(userData),
         this.updateUserData(userData.user)
      }).catch(err => console.log(reject(err)))
    });
  }

  // registerUser(email: string, pass: string){
  //   return new Promise ((resolve, reject) => {
  //     this.afsAuth.auth.createUserWithEmailAndPassword(email, pass) // TODO: add name to the register method
  //     .then( userData => resolve(userData),
  //     err => reject(err));
  //   });
  // }

  loginEmailUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reject (err));
    });
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

}
