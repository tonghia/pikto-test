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
  // an object to handle add images and send to api create by FileUpload library
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
    // get data from api
    this.apiService.getImage().subscribe(res => {
      this.images = res;
    });

    // listen from uploader when it finish a post request to api
    this.uploader.response.subscribe(res => {
      let newImage = JSON.parse(res);
      this.images.push(newImage['file']);
    });
  }

  /**
   * Use uploader to upload image to api
  */
  uploadImage() {
    if (this.uploader.queue.length) {
      let uploadImage = this.uploader.queue[0];
      uploadImage.upload();
    }
  }

  /**
   * Pass image url to CanvasComponent add new Image Element
   * @param imgUrl : string
   */
  onClickImg(imgUrl: string) {
    this.elementSubject.next({imgUrl, type: 'image'});
  }

  /**
   * Pass text value to CanvasComponent add new Text Element
   * @param text : string
   */
  onClickTxt(text: string) {
    this.elementSubject.next({text, type: 'text'});
  }
}
