import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';  //Cookie module

@Component({
  selector: 'app-segnala',
  templateUrl: './segnala.component.html',
  styleUrls: ['./segnala.component.css']
})
export class SegnalaComponent implements OnInit {
  o :Observable<Object>;
  mess: string;
  constructor(public http: HttpClient, private cookieService: CookieService) { }

  segnala(Scooter: HTMLInputElement, tipo: HTMLInputElement):boolean{
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });


    const params = new HttpParams()
      .set('idMezzo', Scooter.value)
      .set('desc', tipo.value);

      const options = {
      headers,
      params,
      withCredentials: false
    };

    var parameter = JSON.stringify({ idMezzo: Scooter.value, desc: tipo.value });

    this.http.post('https://3000-c0ecda88-6304-4e5f-a369-0d9bcbc76e66.ws-eu0.gitpod.io/segnala',null, options  )
      .subscribe(data => {
        if(data[0].message == "OK"){
          this.mess="Problema inviato";
        }else{
          this.mess="ERR Riprova";
        }
    });
    return false;
  }

  ngOnInit() {
  }

}
