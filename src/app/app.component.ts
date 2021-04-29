import { Component } from '@angular/core';
import cities from "../assets/city.list.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 citiesList:any[]= cities;
 renderList:any[] = [];
 index = 1;
 timer;
  
ngOnInit(){
  if( this.citiesList[0]) { 
    this.renderList.push(this.citiesList[0]);
}
this.timer = setInterval(() => {
    if (this.index < this.citiesList.length) {
       this.renderList.push(this.citiesList[this.index]);
       this.index++;
    } else { 
       clearInterval(this.timer); // this is optional but good practice
    }
 }, 4000)

}
}
