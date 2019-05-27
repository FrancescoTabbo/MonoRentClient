import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  //Cookie module
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mono';
  cookie: boolean = false;

  constructor(private cookieService: CookieService, private router: Router){

    if(this.cookieService.get('ID') != ""){
      this.cookie = true;
    }
  }

  take(){
    this.router.navigate(['/take']);
  }

   segnala(){
    this.router.navigate(['/take']);
  }

  logout():boolean{
    this.cookieService.delete('ID');
    this.cookie = false;
    return true;
  }
}
