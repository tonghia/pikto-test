import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CanvasObject } from './canvas.model';
import { AppService } from '../core/app.service';
import { Subject } from 'rxjs/Subject';
import { CanvasImageComponent } from './canvas-img.component';

declare var require: any
var FileSaver = require('file-saver');

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  dataUri: string;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChildren(CanvasImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;

  canvasObj = new CanvasObject();
  elementSubject: Subject<any>;
  canvasWidth: number;
  canvasHeight: number;

  initialMouseX: number;
  initialMouseY: number;

  isDragging = false;
  activeIndex;
  isDragImg = true;

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
    this.canvasWidth = this.canvas.nativeElement.clientWidth;
    this.canvasHeight = this.canvas.nativeElement.clientHeight;
  }

  removeImage(index) {
    this.canvasObj.imgArr.splice(index, 1);
  }

  removeText(index) {
    this.canvasObj.textArr.splice(index, 1);
  }

  onMouseDownElem(event, i, isImage = true) {
    event.preventDefault();
    let activeElem = isImage ? this.canvasObj.imgArr[i] : this.canvasObj.textArr[i];
    this.initialMouseX = activeElem.x - event.clientX;
    this.initialMouseY = activeElem.y - event.clientY;
    this.isDragging = true;
    this.activeIndex = i;
    this.isDragImg = isImage;
  }

  onMouseMoveElem(event, i, isImage?) {
    event.preventDefault();
    if (this.isDragging && this.activeIndex == i && this.isDragImg == isImage) {
      let mouseMoveX = event.clientX + this.initialMouseX;
      let mouseMoveY = event.clientY + this.initialMouseY;

      let activeElem = isImage ? this.canvasObj.imgArr[i] : this.canvasObj.textArr[i];
      activeElem.x = mouseMoveX;
      activeElem.y = mouseMoveY;
    }
  }

  onMouseUpElem() {
    this.isDragging = false;
  }

  onMouseDownElem2(event, i, isImage = true) {
    event.preventDefault();
    let activeElem = isImage ? this.canvasObj.imgArr[i] : this.canvasObj.textArr[i];
    this.initialMouseX = activeElem.x - event.clientX;
    this.initialMouseY = activeElem.y - event.clientY;
    this.isDragging = true;
    this.activeIndex = i;
    this.isDragImg = isImage;
  }

  onMouseMoveElem2(event, i, isImage?) {
    if (this.isDragging && this.activeIndex == i && this.isDragImg == isImage) {
      let mouseMoveX = event.clientX + this.initialMouseX;
      let mouseMoveY = event.clientY + this.initialMouseY;

      let activeElem = isImage ? this.canvasObj.imgArr[i] : this.canvasObj.textArr[i];
      activeElem.x = mouseMoveX;
      activeElem.y = mouseMoveY;
    }
  }

  export() {
    let json = JSON.stringify(this.canvasObj);
    console.log(json);
    let blob = new Blob([json], {type:"application/json;charset=utf-8"});
    FileSaver.saveAs(blob, "export.json");
  }

  import(event) {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      this.canvasObj = new CanvasObject(JSON.parse(text));
      console.log(text, this.canvasObj);
    };

    reader.readAsText(file);
  }

}
