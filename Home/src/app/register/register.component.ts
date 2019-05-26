import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertService, UserService, AuthenticationService } from '../_services';
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
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        public http: HttpClient
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    Registrati(Nome:HTMLInputElement, Cognome:HTMLInputElement, Indirizzo:HTMLInputElement, Telefono:HTMLInputElement, Email:HTMLInputElement, Nickname:HTMLInputElement, Password:HTMLInputElement): void {
      const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'

    });
    const params = new HttpParams()
      .set('Nome', Nome.value)
      .set('Cognome', Cognome.value)
      .set('Indirizzo', Indirizzo.value)
      .set('Telefono', Telefono.value)
      .set('Email', Email.value)
      .set('Nickname', Nickname.value)
      .set('Password', Password.value);

      const options = {
      headers,
      params,
      withCredentials: false
    };

    var parameter = JSON.stringify({ Nome: Nome.value, Cognome: Cognome.value,Indirizzo: Indirizzo.value,Telefono: Telefono.value,Email: Email.value,Nickname: Nickname.value, Password: Password.value });
    this.loading = true;
    this.http.post('https://3000-d670e502-c231-409e-b2f8-68e3b042a9da.ws-eu0.gitpod.io/segnalaG',null, options  )
      .subscribe(data => {
        if(data[0].message == "OK"){
          this.cookieService.set('ID','username');
          this.router.navigate(['/home']);
        }
    },error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
      }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
