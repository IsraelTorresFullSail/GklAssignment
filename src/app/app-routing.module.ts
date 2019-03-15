import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { LogoutGuard } from './logout.guard';

const routes: Routes = [
  { path: '', redirectTo: 'wall', pathMatch: 'full'},
  { path: 'wall', component: WallComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },                            // TODO: config logout.guard.ts for this path
  { path: 'register', component: RegisterComponent }                       // TODO: config logout.guard.ts for this path

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
