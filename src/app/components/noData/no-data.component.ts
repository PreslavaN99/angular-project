import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./no-data.component.css']
})
export class NoDataComponent {
}
