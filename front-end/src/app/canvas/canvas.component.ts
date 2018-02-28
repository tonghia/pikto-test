import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CanvasObject } from './canvas.model';
import { AppService } from '../core/app.service';
import { Subject } from 'rxjs/Subject';
import { CanvasImageComponent } from './canvas-img.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChildren(CanvasImageComponent, { read: ElementRef }) 
  images: QueryList<ElementRef>;

  // imageElements = [];
  canvasObj = new CanvasObject();
  elementSubject: Subject<any>;
  canvasWidth: number;
  canvasHeight: number;

  activeElement;
  activeImage;

  initialMouseX: number;
  initialMouseY: number;

  isDragging = false;

  constructor(public appService: AppService) {
    this.elementSubject = this.appService.addElement;
  }

  ngOnInit() {
    this.elementSubject.subscribe(elemData => {
      if (elemData.type === 'image') {
        this.canvasObj.addImage(elemData['imgUrl']);
      } else if (elemData.type === 'text') {
        this.canvasObj.addText(elemData['text']);
      }
    });
  }

  ngAfterViewInit() {
    // this.imageElements = this.images.toArray();
    this.canvasWidth = this.canvas.nativeElement.clientWidth;
    this.canvasHeight = this.canvas.nativeElement.clientHeight;
  }

  removeImage(index) {
    this.canvasObj.imgArr.splice(index, 1);
  }

  removeText(index) {
    this.canvasObj.textArr.splice(index, 1);
  }

  onMouseDownCanvas(event) {
  }

  onMouseMoveCanvas(event) {
  }

  onMouseUpCanvas() {
  }

  onMouseDownElem(event, i) {
    // console.log('offset' + e.offsetX, 'client' + e.clientX);
    // let imageElements = this.images.toArray();
    // this.activeElement = imageElements[i].nativeElement;
    // console.dir(this.activeElement);
    // this.activeImage = this.canvasObj.imgArr[i];
    // console.log(this.activeImage);
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
    console.log(this.initialMouseX, this.initialMouseY, new Date().getTime());
    this.isDragging = true;
  }

  onMouseMoveElem(event, i) {
    // console.log('move', event);
    if (this.isDragging && this.initialMouseX !== null) {
      let mouseMoveX = event.clientX - this.initialMouseX;
      let mouseMoveY = event.clientY - this.initialMouseY;

      let activeImage = this.canvasObj.imgArr[i];
      activeImage.x = mouseMoveX;
      activeImage.y = mouseMoveY;
      console.log('hi', mouseMoveX, mouseMoveY, event.clientX, event.clientY, new Date().getTime());
    }
  }

  onMouseUpElem(event) {
    // this.activeImage = null;
    this.isDragging = false;
    console.log('hello');
  }
}
