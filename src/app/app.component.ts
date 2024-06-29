import { Component } from '@angular/core';

import { ServiceDepService } from './services/service-dep.service';
import { OnInit } from '@angular/core';
import { Employee } from './employee';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[ServiceDepService]
})
export class AppComponent {
  title = 'ProdDep';




 
}
