import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage, private fb: FormBuilder){}

  @ViewChild('userName') inputUserName: ElementRef;
  @ViewChild('userImage') inputUserImage: ElementRef;

  formRegister = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  //public email: string = '';
  //public password: string = '';



  //-----Properties to save the picture url
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit(){

  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);    //-----Variable to get a random number used to not overwrite files with the same name
    const file = e.target.files[0];
    const filePath =`uploads/picture_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onAddUser(){
    this.authService.registerUser(this.formRegister.get('email').value, this.formRegister.get('password').value)
    .then((res) => {
      this.authService.isAuth().subscribe( user => {
        if(user){
          user.updateProfile({
            displayName: this.inputUserName.nativeElement.value,
            photoURL: this.inputUserImage.nativeElement.value
          }).then( () => {
            console.log('USER UPDATED', user);
            this.router.navigate(['wall']);
          }).catch( (error) => console.log('error', error));
        }
      });
    }).catch( err => console.log('err', err.message));
  }

}
