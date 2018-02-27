import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ImgObj } from './canvas.model';
import { AppService } from '../core/app.service';

@Component({
    selector: 'canvas-img',
    template: `<div>
                <img [src]="imgObj.url">
            </div>`,
    styles: []
})
export class CanvasImageComponent implements OnInit {

    @Input() imgObj: ImgObj;
    constructor(public appService: AppService) {
    }

    ngOnInit() {
    }

}
