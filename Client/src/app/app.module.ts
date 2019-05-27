import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SegnalaComponent } from './segnala/segnala.component';
import { TakeComponent } from './take/take.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SegnalaComponent,
    TakeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
