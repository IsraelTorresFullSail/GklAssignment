import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostInterface } from './models/post';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  user: Observable<firebase.User>;
  userName: string;
  imageURL: string;

  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router, private afsAuth: AngularFireAuth, private storage: AngularFireStorage) {
    
    this.user = afsAuth.authState;
    this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.userName = user.displayName;
        this.imageURL = user.photoURL;
        console.log(`[constructor]userName : ${this.userName}`);
      }
    });

    this.postsWall = afs.collection<PostInterface>('posts');
    this.posts = this.postsWall.valueChanges();
   }

  private postsWall: AngularFirestoreCollection<PostInterface>; 
  private posts: Observable<PostInterface[]>;
  public selectedPost: PostInterface = {};

  getAllPost(){
    return this.posts = this.postsWall.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as PostInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  addPost(post: PostInterface): void {
    if(post.date_time == null){
      post.date_time = Date.now();
    }
    if(post.userName == null){
      post.userName = this.userName;
    }
    if(post.imageURL == null){
      post.imageURL = this.imageURL;
    }
    this.postsWall.add(post);
  }

  



}
