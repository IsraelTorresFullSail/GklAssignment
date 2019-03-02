import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService){}

  public email: string = '';
  public password: string = '';

  ngOnInit(){

  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res) => {
      this.router.navigate(['wall']);
    }).catch( err => console.log('err', err.message));
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
