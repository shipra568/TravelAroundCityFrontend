import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  destUrl = "//localhost:8080/destinations";

constructor(private http: HttpClient) {
  }

  getDestinationList(city: string) : Observable<String>{
    let headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
    console.log("city is " + city);
    let params = new HttpParams().set('city', city);
    return this.http.get<String>(this.destUrl,{headers: headers, params: params});
  }
}
