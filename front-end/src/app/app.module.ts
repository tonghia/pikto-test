import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SidepaneComponent } from './sidepane/sidepane.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ApiService } from './core/api.service';
import { HttpClientModule } from '@angular/common/http';

import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    SidepaneComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
