import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getImage() {
    return this.http.get('http://localhost:8000/images');
  }

  uploadImage(data) {
    console.log(data);
    return this.http.post('http://localhost:8000/uploads', data);
  }

}