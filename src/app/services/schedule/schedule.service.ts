import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PathsService } from '../cfg/paths.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url = this.paths.apiUrl + '/schedules';

  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private paths: PathsService) { }

  getAll(){
    return this.http.get(this.url, this.httpOptions);
  }
}
