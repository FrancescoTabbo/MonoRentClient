import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Scooter } from './Scooter.model';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.css']
})
export class TakeComponent implements OnInit {
  o:Observable<Object>;
  Scot: Array<Scooter>= [];
  mess: string="";
  took: boolean =false;
  lat: number = 45.283828;
  lng: number = 9.105340;

  constructor(public http: HttpClient, private cookieService: CookieService) {
    if(this.cookieService.get('Nol') != ""){
      this.took=true;
    }
    this.o = this.http.get('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/visualizza');
    this.o.subscribe(data => {
        for(var i = 0; i < data; i++){
          this.Scot.push(new Scooter(data[i].ID, data[i].Coord, data[i].Stato));
        }
    });
  }
  take(codice: HTMLInputElement): boolean{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const params = new HttpParams()
      .set('Scooter', codice.value);

      const options = {
      headers,
      params,
      withCredentials: false
    };
    var parameter = JSON.stringify({ Scooter: codice.value  });
    this.http.post('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/takeOn',null, options  )
      .subscribe(data => {
        if(data[0].message == "OK"){
          this.mess="Monopattino disponibile!";
          this.cookieService.set("Nol", codice.value);
          this.took= true;
        }else{
          this.mess="ERR Riprova";
        }
    });
    return false;
  }
  takeoff(): boolean{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const params = new HttpParams()
      .set('Scooter', this.cookieService.get('Nol'));

      const options = {
      headers,
      params,
      withCredentials: false
    };
    var parameter = JSON.stringify({ Scooter: this.cookieService.get('Nol')  });
    this.http.post('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/takeOff',null, options  )
      .subscribe(data => {
        if(data[0].message == "OK"){
          this.mess="Monopattino bloccato!";
          this.took=false;
        }else{
          this.mess="ERR Riprova";
        }
    });
    return false;
  }
  ngOnInit() {
  }
}
