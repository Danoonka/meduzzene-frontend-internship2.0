import {Component} from '@angular/core'
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html',
})
export class MainPage{
  title = environment.title;
}
