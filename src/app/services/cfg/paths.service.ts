import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathsService {

  // public apiUrl = "http://localhost:8080/api";
  public apiUrl = 'https://egms-api.herokuapp.com/api';

  constructor() { }
  getUrl(){
    return this.apiUrl;
  }

}
