import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TextObj } from './canvas.model';
import { AppService } from '../core/app.service';

@Component({
    selector: 'canvas-txt',
    template: `<div class="wrapper position-relative p-2">
                <span class="position-absolute remove-btn" (click)="removeText.emit()">x</span>
                <span>{{ txtObj.value }}</span>
            </div>`,
    styles: [`
    .remove-btn {
        font-size: 1rem;
        line-height: 1;
        top: 0;
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
export class CanvasTextComponent implements OnInit {

    @Input() txtObj: TextObj;
    @Output() removeText = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }

}
