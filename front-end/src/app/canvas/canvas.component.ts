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
    // this.initialMouseX = event.clientX;
    // this.initialMouseY = event.clientY;
  }

  onMouseMoveCanvas(event) {
    // if (this.activeElement) {
      // let mouseMoveX = event.clientX - this.initialMouseX;
      // let mouseMoveY = event.clientY - this.initialMouseY;
      // this.activeImage.x = mouseMoveX;
      // this.activeImage.y = mouseMoveY;
    // }
  }

  onMouseUpCanvas() {
    // this.activeElement = null;
  }

  onMouseDownElem(event, i) {
    // console.log('offset' + e.offsetX, 'client' + e.clientX);
    // let imageElements = this.images.toArray();
    // let activeElement = imageElements[i].nativeElement;
    // this.activeElement = activeElement;
    // console.dir(this.activeElement)
    // this.activeImage = this.canvasObj.imgArr[i];
    // console.log(this.activeImage);
    event.preventDefault();
    event.stopPropagation();
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
    console.log(this.initialMouseX, this.initialMouseY);
    this.isDragging = true;
  }

  onMouseMoveElem(event, i) {
    event.preventDefault();
    event.stopPropagation();
    // console.log('move', event);
    if (this.isDragging && this.initialMouseX !== null) {
      let mouseMoveX = event.clientX - this.initialMouseX;
      let mouseMoveY = event.clientY - this.initialMouseY;

      let activeImage = this.canvasObj.imgArr[i];
      activeImage.x = mouseMoveX;
      activeImage.y = mouseMoveY;
      console.log('hi', mouseMoveX, mouseMoveY, event.clientX, event.clientY);
    }
  }

  onMouseUpElem(event) {
    event.preventDefault();
    event.stopPropagation();
    // this.activeImage = null;
    this.isDragging = false;
    this.initialMouseX = null;
    console.log('hello');
  }
}
