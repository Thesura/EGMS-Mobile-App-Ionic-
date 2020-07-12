import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { PathsService } from '../cfg/paths.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = this.paths.apiUrl + '/reports';

  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private paths: PathsService) { }

  create(report){
    return this.http.post(this.url, JSON.stringify(report), this.httpOptions);
  }
}
