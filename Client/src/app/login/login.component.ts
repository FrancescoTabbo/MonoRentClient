import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({templateUrl: 'login.component.html',
selector: 'app-login',
  styleUrls: ['./login.component.css']
}})
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
        public http: HttpClient
    ){}
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
    this.http.post('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/login',null, options  )
    .pipe(first())
      .subscribe(data => {
        if(data[0].message == "OK"){
          this.cookieService.set('ID','username');
          this.router.navigate(['/home']);
        }

    },error => {

                    this.loading = false;
                });
      }

    ngOnInit() {
    }
}
