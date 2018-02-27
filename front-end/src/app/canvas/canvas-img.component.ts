import { Component, OnInit, ViewChild, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { ImgObj } from './canvas.model';
import { AppService } from '../core/app.service';

@Component({
    selector: 'canvas-img',
    template: `<div class="wrapper position-relative">
                <span class="position-absolute remove-btn" (click)="removeImage.emit()">x</span>
                <img [src]="imgObj.url" draggable="false">
            </div>`,
    styles: [`
        .remove-btn {
            font-size: 2rem;
            line-height: 1;
            top: -10px;
            right: 0;
            cursor: pointer;
            visibility: hidden;
        }
        .remove-btn:hover {
            color: blue;
        }
        .wrapper:hover .remove-btn {
            visibility: visible;
        }
    `]
})
export class CanvasImageComponent implements OnInit {

    @Input() imgObj: ImgObj;
    @Output() removeImage = new EventEmitter();
    constructor() {
        // console.log(elementRef);
    }

    ngOnInit() {
    }

}
