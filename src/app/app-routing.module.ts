import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'wall', component: WallComponent }, // TODO: only user auth.
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
