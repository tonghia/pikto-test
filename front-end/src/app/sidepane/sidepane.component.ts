import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-sidepane',
  templateUrl: './sidepane.component.html',
  styleUrls: ['./sidepane.component.scss']
})
export class SidepaneComponent implements OnInit {

  images: any = [];
  public uploader:FileUploader = new FileUploader({
    url: 'http://localhost:8000/uploads',
    // itemAlias: "uploader"
  });
  
  constructor(public apiService: ApiService) { }

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
}
