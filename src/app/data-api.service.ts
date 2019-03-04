//-----This service manage the methods for posts.

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostInterface } from './models/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
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
    this.postsWall.add(post);
  }

  getTimeStamp(){                             //
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();  
                 
    return (date + ' ' + time);
                 
  }


}
