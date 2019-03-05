import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user';
import { DataApiService } from '../data-api.service';
import { PostInterface} from '../models/post';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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

  constructor(private authService: AuthService, private dataApi: DataApiService, private fb: FormBuilder) { }

  //-----Property to get the post in the wall
  public posts = [];
  public post = '';

  //-----Property to add a new post
  private newposts: PostInterface = {};

  ngOnInit() {
    this.getListPosts();
  }

  getListPosts(){
    this.dataApi.getAllPost().subscribe(posts => {
      console.log('POSTS', posts);
      this.posts = posts.sort(function(a,b){   //-----This is a function order the posts descending.
        if(a.date_time > b.date_time) return -1;
        return 0;
      });
    });
  }

  onSavePost(formPost: FormBuilder): void {
    this.dataApi.addPost(this.formPost.value);
    this.formPost.reset();

  }

  trackByCreated(index, msg){
    return msg.date_time;
  }

}
