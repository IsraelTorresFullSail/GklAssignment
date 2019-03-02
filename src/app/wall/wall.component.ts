import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInterface } from '../models/user';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: UserInterface = {
    name: ''
  };

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user){
        this.user = user;
        console.log('USER', user);
      }
    })
  }

}
