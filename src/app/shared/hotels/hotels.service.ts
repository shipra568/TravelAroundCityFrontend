import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Hotel} from '../../Hotel'

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  destUrl = "//localhost:8080/hotels"
  hotelList:Observable<Map<String,String>>;

  constructor(private http: HttpClient) { }

  getHotelList(){
    return this.hotelList;
  }

  getHotels(destinationSelected:string,city:string) {
    let headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
    let params = new HttpParams().set('destList', destinationSelected).set('city',city);
     this.hotelList = this.http.get<Map<String,String>>(this.destUrl,{headers: headers, params: params});
  }
}
