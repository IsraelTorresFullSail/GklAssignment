import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user';
import { DataApiService } from '../data-api.service';
import { PostInterface} from '../models/post';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})

export class WallComponent implements OnInit {

   formPost = this.fb.group({
     title: ['', Validators.required],
     description: ['', Validators.required],
   });

  constructor(private authService: AuthService, private dataApi: DataApiService, private fb: FormBuilder, private storage: AngularFireStorage) { }

  @ViewChild('imagePost') inputImagePost: ElementRef;

  //-----Property to get the post in the wall
  public posts = [];
  public post = '';

  //-----Property to add a new post
  private newposts: PostInterface = {
    //imageURL: this.inputImagePost.nativeElement.value
  };

  //-----Properties to save the picture url
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    this.getListPosts();
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);    //-----Method to generate a random number used to not overwrite files with the same name
    const file = e.target.files[0];
    const filePath =`uploads/picture_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  getListPosts(){
    this.dataApi.getAllPost().subscribe(posts => {
      console.log('POSTS', posts);
      this.posts = posts.sort(function(a,b){   //-----This is a function to order the posts descending.
        if(a.date_time > b.date_time) return -1;
        return 0;
      });
    });
  }

  onSavePost(formPost: FormBuilder): void {
    this.dataApi.addPost(this.formPost.value);
    this.formPost.reset();

  }

}
