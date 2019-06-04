import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SegnalaComponent } from './segnala/segnala.component';
import { TakeComponent } from './take/take.component';
import { AgmCoreModule } from '@agm/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';


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
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6ofjkhIjlog4Otj8J0b12dZnxKwfVkdU'
    })
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
