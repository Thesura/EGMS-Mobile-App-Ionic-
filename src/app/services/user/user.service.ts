import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PathsService} from '../cfg/paths.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = this.paths.getUrl() + '/nonstaffusers';

  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private paths: PathsService) { }

  login(user){
    return this.http.post(this.url + '/login', JSON.stringify(user), this.httpOptions);
  }

  register(user){
    return this.http.post(this.url, JSON.stringify(user), this.httpOptions);
  }

}
