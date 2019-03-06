//-----This service manage the methods for user login and register.

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {}

  //-----Methods to work with firebase.
  registerUser(email: string, pass: string){
    return new Promise ((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass) // TODO: add name to the register method
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }

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
