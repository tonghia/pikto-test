import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidepaneComponent } from './sidepane/sidepane.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasImageComponent } from './canvas/canvas-img.component';
import { CanvasTextComponent } from './canvas/canvas-txt.component';

import { ApiService } from './core/api.service';
import { AppService } from './core/app.service';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    SidepaneComponent,
    CanvasComponent,
    CanvasImageComponent,
    CanvasTextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [
    ApiService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
