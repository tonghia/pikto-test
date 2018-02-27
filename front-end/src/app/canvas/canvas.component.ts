import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasObject } from './canvas.model';
import { AppService } from '../core/app.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas') canvas;
  canvasObj = new CanvasObject();
  elementSubject: Subject<any>;
  constructor(public appService: AppService) {
    this.elementSubject = this.appService.addElement;
  }

  ngOnInit() {
    this.elementSubject.subscribe(elemData => {
      console.log(elemData);
      if (elemData.type === 'image') {
        this.canvasObj.addImage(elemData['imgUrl']);
      } else if (elemData.type === 'text') {
        this.canvasObj.addText(elemData['text']);
      }
      console.log(this.canvasObj);
    });
  }

}
