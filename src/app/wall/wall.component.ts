import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user';
import { DataApiService } from '../data-api.service';
import { PostInterface} from '../models/post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  constructor(private authService: AuthService, private dataApi: DataApiService) { }

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

  onSavePost(postForm: NgForm): void {
    this.dataApi.addPost(postForm.value);
    postForm.resetForm();

  }

}
