import { Component, OnInit } from '@angular/core';

import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
  selector: "app-add-respondent",
  templateUrl: "./add-respondent.page.html",
  styleUrls: ["./add-respondent.page.scss"],
})
export class AddRespondentPage implements OnInit {
  constructor(public photoService: PhotoService) {}

  ngOnInit() {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
