import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataApiService } from '../data-api.service';
import { PostInterface} from '../models/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/user';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})

export class WallComponent implements OnInit {

  //-----Creating the Reactive Form with FormBuilder to generate control
  formPost = this.fb.group({
     title: ['', Validators.required],
     description: ['', Validators.required],
   });

  constructor(private authService: AuthService, private dataApi: DataApiService, private fb: FormBuilder) { }

  //-----Property to get the post in the wall
  public posts = [];
  public post = '';

  //-----Property to add a new post
  private newposts: PostInterface = {};

  //-----Properties to save the picture url
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  //-----Property to show the displayName
  user: UserInterface = {
    name: ''
  };
  public providerId: string = 'null'; 

  ngOnInit() {
    //-----Show displayName
    this.authService.isAuth().subscribe( user => {
      if(user){
        this.user.name = user.displayName;
        this.providerId = user.providerData[0].providerId
      }
    })

    //-----Show Post
    this.getListPosts();
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

  onSavePost(): void {
    this.dataApi.addPost(this.formPost.value);
    this.formPost.reset();
  }

}
