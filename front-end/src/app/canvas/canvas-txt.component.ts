import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TextObj } from './canvas.model';
import { AppService } from '../core/app.service';

@Component({
    selector: 'canvas-txt',
    template: `<div>
                <span>{{ txtObj.value }}</span>
            </div>`,
    styles: []
})
export class CanvasTextComponent implements OnInit {

    @Input() txtObj: TextObj;
    constructor(public appService: AppService) {
    }

    ngOnInit() {
    }

}
