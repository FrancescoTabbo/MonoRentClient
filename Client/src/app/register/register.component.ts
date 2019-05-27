import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  @Input() cookieService:CookieService;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public http: HttpClient
    ){}
    Registrati(Nome:HTMLInputElement, Cognome:HTMLInputElement, Indirizzo:HTMLInputElement, Telefono:HTMLInputElement, Email:HTMLInputElement, nickname:HTMLInputElement, password:HTMLInputElement): void {
      const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'

    });
    const params = new HttpParams()
      .set('Nome', Nome.value)
      .set('Cognome', Cognome.value)
      .set('Indirizzo', Indirizzo.value)
      .set('Telefono', Telefono.value)
      .set('Email', Email.value)
      .set('nickname', nickname.value)
      .set('password', password.value);

      const options = {
      headers,
      params,
      withCredentials: false
    };

    var parameter = JSON.stringify({ Nome: Nome.value, Cognome: Cognome.value,Indirizzo: Indirizzo.value,Telefono: Telefono.value,Email: Email.value,nickname: nickname.value, password: password.value });
    this.loading = true;
    this.http.post('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/register',null, options  )
      .subscribe(data => {
        if(data[0].message == "OK"){
          this.cookieService.set('ID','username');
          this.router.navigate(['/home']);
        }
    },error => {
                    this.loading = false;
                });
      }

    ngOnInit() {}
    }
