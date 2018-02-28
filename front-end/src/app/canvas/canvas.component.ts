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
    // listen from a Subject to receive Image or Text data (from SidePaneComponent)
    this.elementSubject.subscribe(elemData => {
      if (elemData.type === 'image') {
        this.canvasObj.addImage(elemData['imgUrl']);
      } else if (elemData.type === 'text') {
        this.canvasObj.addText(elemData['text']);
      }
    });
  }

  ngAfterViewInit() {
    // get canvas info for fun (maybe we will need it if canvas has flexible size)
    this.canvasWidth = this.canvas.nativeElement.clientWidth;
    this.canvasHeight = this.canvas.nativeElement.clientHeight;
  }

  removeImage(index) {
    this.canvasObj.imgArr.splice(index, 1);
  }

  removeText(index) {
    this.canvasObj.textArr.splice(index, 1);
  }

  /**
   *
   * @param event : MouseEvent
   * @param i : Element index
   * @param isImage : image or text?
   */
  onMouseDownElem(event, i, isImage = true) {
    let activeElem = isImage ? this.canvasObj.imgArr[i] : this.canvasObj.textArr[i];
    this.initialMouseX = activeElem.x - event.clientX;
    this.initialMouseY = activeElem.y - event.clientY;
    this.isDragging = true;
    this.activeIndex = i;
    this.isDragImg = isImage;
  }

  /**
   * Calculate distant Mouse move and apply for active element
   * @param event : MouseEvent
   * @param i : number
   * @param isImage : boolean
   */
  onMouseMoveElem(event, i, isImage?) {
    if (this.isDragging && this.activeIndex == i && this.isDragImg == isImage) {
      let mouseMoveX = event.clientX + this.initialMouseX;
      let mouseMoveY = event.clientY + this.initialMouseY;

      let activeElem = isImage ? this.canvasObj.imgArr[i] : this.canvasObj.textArr[i];
      activeElem.x = mouseMoveX;
      activeElem.y = mouseMoveY;
    }
  }

  /**
   * stop listen to mouse
  */
  onMouseUpElem() {
    this.isDragging = false;
  }

  /**
   * Use FileSaver (from library) to download a json file contain data for current canvas
  */
  export() {
    let json = JSON.stringify(this.canvasObj);
    let blob = new Blob([json], {type:"application/json;charset=utf-8"});
    FileSaver.saveAs(blob, "export.json");
  }

  /**
   * read data from data file and create CanvasObject
   * @param event : InputEvent
   */
  import(event) {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      this.canvasObj = new CanvasObject(JSON.parse(text));
    };

    reader.readAsText(file);
  }

}
