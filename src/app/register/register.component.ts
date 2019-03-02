import { Component, OnInit } from '@angular/core';
//import { FormBuilder } from '@angular/forms';
//import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // registerForm = this.fb.group({
  //   name: ['', Validators.required],
  //   email: ['', Validators.required],
  //   password: ['', Validators.required],
  // });

  constructor(private router: Router, private authService: AuthService){}

  public email: string = '';
  public password: string = '';

  // onRegister() {
  //   // TODO: Use EventEmitter with form value
  //   console.warn(this.registerForm.value);
  // }

  ngOnInit(){

  }

  onAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.router.navigate(['wall']);
    }).catch( err => console.log('err', err.message));
  }


}
