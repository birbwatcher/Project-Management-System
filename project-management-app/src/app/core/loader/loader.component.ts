import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { TokenInterceptor } from 'src/app/services/token.interceptor';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public http: HttpService) {}

}
