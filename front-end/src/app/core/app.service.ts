import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


// const API_URL = environment.apiUrl;

@Injectable()
export class AppService {

    addElement = new Subject();
    constructor() {
    }

}