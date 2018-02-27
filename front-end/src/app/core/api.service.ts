import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  readonly API_URL = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) {
  }

  getImage() {
    return this.http.get(this.API_URL + 'images');
  }

  uploadImage(data) {
    return this.http.post(this.API_URL + 'uploads', data);
  }

}