import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SegnalaComponent } from './segnala/segnala.component';
import { TakeComponent } from './take/take.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'segnala', component: SegnalaComponent},
    { path: 'take', component: TakeComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },

    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
