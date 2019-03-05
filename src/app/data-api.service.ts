//-----This service manage the methods for posts.

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostInterface } from './models/post';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router) {
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
    this.postsWall.add(post);
  }

  // joinUsers(post$: Observable<any>){
  //   let post;
  //   const joinKeys = {};
  //   return post$.pipe(
  //     switchMap(p => {
  //       post = p;
  //       const uids = Array.from(new Set(p.posts.map(v => v.uid)));
  //       const userDocs = uids.map(u =>
  //           this.afs.doc(`users/${u}`).valueChanges()
  //         );
  //         return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map(arr => {
  //       arr.forEach(v => (joinKeys[(<any>v).uid] = v));
  //       post.posts = post.posts.map(v => {
  //         return { ...v, user: joinKeys[v.uid] };
  //       });
  //       return post;
  //     })
  //   )
  // }

  // getTimeStamp(){                             //
  //   const now = new Date();
  //   const date = now.getUTCFullYear() + '/' +
  //                (now.getUTCMonth() + 1) + '/' +
  //                now.getUTCDate();
  //   const time = now.getUTCHours() + ':' +
  //                now.getUTCMinutes() + ':' +
  //                now.getUTCSeconds();  
                 
  //   return (date + ' ' + time);
                 
  // }


}
