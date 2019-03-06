import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService){}

  @ViewChild('userName') inputUserName: ElementRef;

  public email: string = '';
  public password: string = '';

  Name: Observable<string>;    //

  ngOnInit(){

  }

  // onAddUser(){
  //   this.authService.registerUser(this.email, this.password)
  //   .then((res) => {
  //     this.router.navigate(['wall']);
  //   }).catch( err => console.log('err', err.message));
  // }

  onAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.authService.isAuth().subscribe( user => {
        if(user){
          user.updateProfile({
            displayName: this.inputUserName.nativeElement.value
          }).then( () => {
            console.log('USER UPDATED', user);
            this.router.navigate(['wall']);
          }).catch( (error) => console.log('error', error));
        }
      });
    }).catch( err => console.log('err', err.message));
  }

  onLoadname(e){                           //
    console.log('Name', e.path[0].value)
    const name = e.path[0].value;
  }

}
