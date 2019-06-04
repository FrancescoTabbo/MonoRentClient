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
  oScot:Observable<Object>;
  Scot: Array<Scooter>= [];
  mess: string="";
  took: boolean =false;
  lat: number = 45.283828;
  lng: number = 9.105340;

  constructor(public http: HttpClient, private cookieService: CookieService) {
    if(this.cookieService.get('Nol') != ""){
      this.took=true;
    }
    this.oScot = this.http.get('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/visualizza');
    this.oScot.subscribe(data => {
        for(var i = 0; i < data; i++){
          this.Scot.push(new Scooter(data[i]._id, data[i].posizione, data[i].stato, data[i].tipo));
        }
    });
  }
  take(codice: HTMLInputElement): boolean{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const params = new HttpParams()
      .set('Scooter', codice.value)
      .set('idUser', this.cookieService.get('ID'))
      .set('latitudine', "22")
      .set('logitudine', "22");

      const options = {
      headers,
      params,
      withCredentials: false
    };

    var parameter = JSON.stringify({ Scooter: codice.value, idUtente: this.cookieService.get('ID'), latitudine: 22, logitudine: 22});
    this.http.post('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/takeOn',null, options)
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
      .set('Scooter', this.cookieService.get('Nol'))
      .set('idUser', this.cookieService.get('ID'))
      .set('latitudine', "33")
      .set('logitudine', "33");

      const options = {
      headers,
      params,
      withCredentials: false
    };
    var parameter = JSON.stringify({ Scooter: this.cookieService.get('Nol') ,idUser: this.cookieService.get('ID'), latitudine: 33, logitudine: 33 });
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
