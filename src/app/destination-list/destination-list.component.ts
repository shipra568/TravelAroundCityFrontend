import { Component, OnInit,Input } from '@angular/core';
import {DestinationsService} from '../shared/destinations/destinations.service';
import {HotelListComponent} from '../hotel-list/hotel-list.component';
import {Destination} from '../Destination';
import {SelectItem} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {Hotel} from '../Hotel';
import {HotelsService} from '../shared/hotels/hotels.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {TableModule} from 'primeng/table';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/timer';
import { Subscription } from 'rxjs/Subscription';

interface City {
name: string;
code: string;
}

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.css'],
  providers: [HotelListComponent]
})
export class DestinationListComponent implements OnInit {
  destinations: String[];
  cityList:City[];
  selectedCity:City;
  displayedColumns = ['dest','type'];
  destinationSelected:Destination[] = [];
  destinationList:Destination[] = [];
  city:String = "";
  cityString = "";
  hotelArray: Hotel[] = [];
  hotelString = "";
  error = "";
  showError = false;
  showDestinationTable = false;
  showHotelsTable = false;

  constructor(private destinationService: DestinationsService,private hotelListComp: HotelListComponent
  ,private hotelsService: HotelsService,private spinner: NgxSpinnerService) {
     this.cityList = [
            {name: 'Hyderabad', code: 'HY'},
            {name: 'Bengaluru', code: 'BG'},
            {name: 'Jaipur', code: 'JR'},
            {name: 'Delhi', code: 'DL'}
        ];
   }

  ngOnInit() {
  }

  selectChangeHandler(event: any){
    this.selectedCity = event.target.value;
    console.log("selected city***** " + this.selectedCity);
    this.destinationSelected.length = 0;
  }

  getDestinations(){
      this.showDestinationTable = true;
      this.city = this.selectedCity.name;
      this.cityString = "in " + this.city;
      this.destinationList.length = 0;
      this.destinationSelected.length = 0;
      this.spinner.show();
     let subscription = this.destinationService.getDestinationList(this.selectedCity.name).subscribe(data => {
      let iter = 0;
      this.destinations = data.toString().split(",");
      for(let dest of this.destinations){
          let place:String[] = dest.split(":");
          let places = {dest :place[0], type : place[1] }
          this.destinationList.push(places);
      }
      this.destinationList = this.destinationList.slice();
      for (let i = 0; i < this.destinationList.length; i++) {
        console.log("dest is " + this.destinationList[i].dest + " type is " + this.destinationList[i].type);
      }
      this.spinner.hide();
    });

     setTimeout(() => {subscription.unsubscribe();
        this.spinner.hide();
        this.error = "Poor internet connection";
        this.setTimer();
      }, 120000);
  }

  findHotels(){

    //Making call to hotel service to get list of hotels in Observerable variable

     this.showHotelsTable = true;
     let selectDestList = '';
      this.hotelString = this.cityString;
      this.hotelArray.length = 0;
      console.log("list intially " + this.hotelArray);
      for(let dest of this.destinationSelected){
        selectDestList = selectDestList + dest.dest + ',';
      }
      selectDestList = selectDestList.substring(0,selectDestList.length-1);
      console.log("destination list " + selectDestList);
      this.spinner.show();

    this.hotelsService.getHotels(selectDestList,this.selectedCity.name);

      let subscription = this.hotelsService.getHotelList().subscribe(data=>{
        let hotelList = JSON.stringify(data);
        console.log("intial hotel list " + hotelList);
        hotelList = hotelList.substring(1,hotelList.length);
        hotelList = hotelList.substring(0,hotelList.length-1);
        console.log("after hotel list " + hotelList);
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
          let track:string = 'Go here first ';
          let destList:string[] = selectDestList.split(",");
          trackAndDist[0] = trackAndDist[0].substring(1,trackAndDist[0].length-1);
          console.log("intial track is " + trackAndDist[0]);
          for(let i=0;i<trackAndDist[0].length;i++){
              track = track.concat((destList[Number(trackAndDist[0].charAt(i))-1]));
              if(i==(trackAndDist[0].length-2))
                track = track + ' \n at last ';
              else if(i!=(trackAndDist[0].length-1))
                  track = track + ' \n then here ';
          }
          hotelObj.track = track;

          //extracting only value before decimal
          trackAndDist[1] = trackAndDist[1].split(".")[0];
          hotelObj.distance = Number(trackAndDist[1]);

          console.log("hotel Name is " + hotelObj.name + " distance is " + hotelObj.distance + " track is " + hotelObj.track);

          //pushing object in array
          this.hotelArray = [...this.hotelArray, hotelObj]
        }
        console.log("DONE");
        for(let hotelObj of this.hotelArray){
          console.log("hotel Name is " + hotelObj.name + " distance is " + hotelObj.distance + " track is " + hotelObj.track);
       }
        this.spinner.hide();
      },
      err=>{
          this.spinner.hide();
          this.error = "Either of the destination doesn't exist in city";
          this.setTimer();
      });

      setTimeout(() => {subscription.unsubscribe();
        this.spinner.hide();
        this.error = "Poor internet connection";
        this.setTimer();
      }, 120000);
  }

  public setTimer(){

    this.showError   = true;

    let timer = Observable.timer(5000); // 5000 millisecond means 5 seconds
    let subscription = timer.subscribe(() => {
        this.showError = false;
    });
  }

}


