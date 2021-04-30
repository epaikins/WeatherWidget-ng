import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import cities from "../../assets/city.list.json";


@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.css']
})
export class WeatherMainComponent implements OnInit {
  weatherData:any;
  citiesList: any[] = cities;
  renderList: any[] = [];
  index = 1;
  timer;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {



    if (this.citiesList[0]) {
      this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?id=${this.citiesList[0].id}&appid=4a42496d8c9879bf9f628764117301ca`).subscribe(
        response => {
          this.setWeatherData(response);
          this.renderList.push(this.weatherData);
        }
      )
      // this.renderList.push(this.citiesList[0]);
      this.renderList.splice(0, 1);
    }
    this.timer = setInterval(() => {
      if (this.index < this.citiesList.length) {
        this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?id=${this.citiesList[this.index].id}&appid=4a42496d8c9879bf9f628764117301ca`).subscribe(
          response => {
            this.setWeatherData(response);
            this.renderList.push(this.weatherData);
          }
        )
        this.renderList.splice(0, 1);
        this.index++;
        // this.renderList.push(this.citiesList[this.index]);
      } else {
        clearInterval(this.timer); // this is optional but good practice
      }
    }, 10000)
  }

  setWeatherData(data){
    this.weatherData = data;
    let sunsetTime =new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime()<sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
    this.weatherData.humidity = this.weatherData.main.humidity;
  }



}
