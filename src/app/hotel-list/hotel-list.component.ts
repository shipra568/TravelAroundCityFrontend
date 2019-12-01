import { Component, OnInit , ApplicationRef } from '@angular/core';
import {HotelsService} from '../shared/hotels/hotels.service';
import {Destination} from '../Destination';
import {Hotel} from '../Hotel';
import { interval } from 'rxjs';
import { ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {

  hotelArray: Hotel[] = [];
  hotelMap: Map<String,String>;
  showTable:Boolean = false;
  constructor(private hotelsService: HotelsService,private appRef: ApplicationRef,private cdRef:ChangeDetectorRef ) { }

  ngOnInit() {
  }

 // findHotels(selectedCity:string,destinationSelected:Destination[]){

      findHotels(){
      this.hotelsService.getHotelList().subscribe(data=>{
        let hotelList = JSON.stringify(data);
        hotelList = hotelList.substring(1,hotelList.length);
        hotelList = hotelList.substring(0,hotelList.length-1);
        console.log(hotelList);
        let stringData = JSON.stringify(hotelList).split(",")
        for(let val of stringData){
          console.log("data is " + val);
          let hotelDistTrackList = val.split(":");

          let hotelObj = new Hotel();

          //remove the " and / from front and end in hotel name
          hotelDistTrackList[0] = hotelDistTrackList[0].replace(/['"]+/g,'');
          hotelDistTrackList[0] = hotelDistTrackList[0].substring(1,hotelDistTrackList[0].length);
          hotelDistTrackList[0] = hotelDistTrackList[0].substring(0,hotelDistTrackList[0].length-1);

          //remove the " and / from front and end in track and distance
          hotelDistTrackList[1] = hotelDistTrackList[1].replace(/['"]+/g,'');
          hotelDistTrackList[1] = hotelDistTrackList[1].substring(1,hotelDistTrackList[1].length);
          hotelDistTrackList[1] = hotelDistTrackList[1].substring(0,hotelDistTrackList[1].length-1);

          console.log("hotel name is " + hotelDistTrackList[0]);
          console.log("hotel name is " + hotelDistTrackList[0].charAt(0));
          console.log("track&dist is " + hotelDistTrackList[1]);

          hotelObj.name = hotelDistTrackList[0];
          let trackAndDist = hotelDistTrackList[1].split("&&");
       //   hotelObj.track = Number(trackAndDist[0]);
          hotelObj.distance = Number(trackAndDist[1]);
          console.log("hotel Name is " + hotelObj.name + " distance is " + hotelObj.distance + " track is " + hotelObj.track);
          //this.hotelArray.push(hotelObj);
          this.hotelArray = [...this.hotelArray, hotelObj]
          console.log("I am called in the last")
        }
        console.log("DONE");
        for(let hotelObj of this.hotelArray){
          console.log("!!!!!!!!!! hotel Name is " + hotelObj.name + " distance is " + hotelObj.distance + " track is " + hotelObj.track);
       }
        this.cdRef.detectChanges();
      });
  }

}
