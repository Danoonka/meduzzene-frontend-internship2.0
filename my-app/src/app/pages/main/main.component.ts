import {Component} from '@angular/core'
import { healthcheckEffects } from 'src/ngRx/healthcheck.effects';
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html',
})
export class MainPage{
  title = environment.title;
  
  constructor() {
  }

  healthCheck() {
    healthcheckEffects()
  }
}
