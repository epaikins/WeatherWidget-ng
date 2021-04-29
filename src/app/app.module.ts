import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherMainComponent } from './weather-main/weather-main.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherMainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
