import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

    addElement = new Subject();
    constructor() {
    }

}