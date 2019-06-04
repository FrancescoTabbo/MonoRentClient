import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SegnalaComponent } from './segnala/segnala.component';
import { TakeComponent } from './take/take.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'segnala', component: SegnalaComponent},
    { path: 'take', component: TakeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
