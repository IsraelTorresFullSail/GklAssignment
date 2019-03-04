import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user';
import { DataApiService } from '../data-api.service';
import { PostInterface} from '../models/post';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})

export class WallComponent implements OnInit {

   formPost = this.fb.group({
     title: ['', Validators.required],
     description: ['', Validators.required],
     date_time: ['', Validators.required],
   });

  constructor(private authService: AuthService, private dataApi: DataApiService, private fb: FormBuilder) { }

  //-----Property to get the user name in the wall // TODO: verificar si o necesito
  user: UserInterface = {
    name: ''
  };
  public providerId: string = 'null';

  //-----Property to get the post in the wall
  public posts = [];
  public post = '';

  //-----Property to add a new post
  private newposts: PostInterface = {};

  ngOnInit() {
    this.authService.isAuth().subscribe(user => { //TODO: verificar si necesito este metodo aqui
      if (user){
        this.user.name = user.displayName;
        this.providerId = user.providerData[0].providerId;
        console.log('USER', this.providerId);
      }
    })

    this.getListPosts();
  }

  getListPosts(){
    this.dataApi.getAllPost().subscribe(posts => {
      console.log('POSTS', posts);
      this.posts = posts;
    });
  }

  onSavePost(formPost: FormBuilder): void {
    this.dataApi.addPost(this.formPost.value);
    this.formPost.reset();

  }

}
