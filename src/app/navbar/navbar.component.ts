import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  public app_name: string = 'GKL Social Network';
  public isLogged: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if (auth){
        console.log('user logged');
        this.isLogged = true;
      }
      else
      {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    })
  }

  onLogout() {
    this.afsAuth.auth.signOut(); //TODO: call this method from service
  }

}
