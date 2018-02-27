import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { ApiService } from '../core/api.service';
import { AppService } from '../core/app.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sidepane',
  templateUrl: './sidepane.component.html',
  styleUrls: ['./sidepane.component.scss']
})
export class SidepaneComponent implements OnInit {

  readonly API_URL = environment.apiUrl;
  images: any = [];
  elementSubject: Subject<any>;
  public uploader:FileUploader = new FileUploader({
    url: this.API_URL + 'uploads',
    // itemAlias: "uploader"
  });

  constructor(
    public apiService: ApiService,
    public appService: AppService
  ) {
    this.elementSubject = this.appService.addElement;
  }

  ngOnInit() {
    this.apiService.getImage().subscribe(res => {
      this.images = res;
    });

    this.uploader.response.subscribe(res => {
      let newImage = JSON.parse(res);
      this.images.push(newImage['file']);
    });
  }

  uploadImage() {
    if (this.uploader.queue.length) {
      let uploadImage = this.uploader.queue[0];
      uploadImage.upload();
    }
  }

  onClickImg(imgUrl) {
    this.elementSubject.next({imgUrl, type: 'image'});
  }

  onClickTxt(text) {
    this.elementSubject.next({text, type: 'text'});
  }
}
