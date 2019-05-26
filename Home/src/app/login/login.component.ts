import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertService, AuthenticationService } from '../_services';
import { CookieService } from 'ngx-cookie-service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  @Input() cookieService:CookieService;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public http: HttpClient
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    Login(nickname :HTMLInputElement,password:HTMLInputElement): void {
       const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'

    });


    const params = new HttpParams()
      .set('nickname', nickname.value)
      .set('password', password.value);

      const options = {
      headers,
      params,
      withCredentials: false
    };

    var parameter = JSON.stringify({ nickname: nickname.value, password: password.value });
    this.loading = true;
    this.http.post('https://df7cac6b-cc76-41e1-a520-ee0ac7652c80.ws-eu0.gitpod.io/login',null, options  )
    .pipe(first())
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
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
