import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTableModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { MatSelectModule, MatButtonModule,MatProgressBarModule } from '@angular/material';
import {HotelsService} from '../app/shared/hotels/hotels.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    DestinationListComponent,
    HotelListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    DataTableModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    DropdownModule,
    NgxSpinnerModule,
    TableModule
  ],
  providers: [HotelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

