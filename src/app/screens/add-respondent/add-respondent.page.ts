import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

import { Storage } from "@ionic/storage";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

import { Response } from "../../interfaces/response";

import { RespondentService } from "src/app/services/respondent/respondent.service";
import { ErrorService } from "src/app/services/error/error.service";
import { PhotoService } from "src/app/services/photo/photo.service";
import { AddRespondentFormData } from "src/app/interfaces/form";
import { RespondentListState } from "src/app/stores/respondent-list/respondent-list-state";

@Component({
  selector: "app-add-respondent",
  templateUrl: "./add-respondent.page.html",
  styleUrls: ["./add-respondent.page.scss"],
})
export class AddRespondentPage implements OnInit {
  addFormData: AddRespondentFormData;
  addRespondentForm: FormGroup;
  token: string;
  capturedPhoto: any;
  photoSrc: SafeUrl = "assets/images/default-avatar.png";

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    public errorService: ErrorService,
    public respondentService: RespondentService,
    public photoService: PhotoService,
    private respondentListState: RespondentListState
  ) {
    this.addRespondentForm = this.formBuilder.group({
      name: ["", Validators.required],
      gender_id: ["", Validators.required],
      age_range: ["", Validators.required],
      religion_id: ["", Validators.required],
      education_id: ["", Validators.required],
      job: ["", Validators.required],
      income_range: ["", Validators.required],
      active_on_social_media: ["", Validators.required],
      address: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.loadForm();
  }

  async loadForm() {
    const loading = await this.loadingController.create({
      message: "Loading...",
    });

    await loading.present();

    this.storage.get("token").then((token) => {
      if (!token) return;
      this.token = token;

      this.respondentService.fetchAddFormData(token).subscribe(
        (res) => {
          this.addFormData = res.data;

          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
          this.errorService.showMessage(err);
        }
      );
    });
  }

  async onSubmit() {
    if (!this.addRespondentForm.valid) {
      this.presentToast();
      return;
    }

    /**
     * We copy the values info to "data",
     * so that we can modify the values without affecting the field's values.
     */
    let data = this.addRespondentForm.value;

    if (this.capturedPhoto) {
      const webPath = await fetch(this.capturedPhoto.webPath!);
      const blob = await webPath.blob();
  
      data.photo = blob;
    }


    const loading = await this.loadingController.create({
      message: "Processing...",
    });

    await loading.present();

    this.respondentService.add(data).subscribe(
      (res: Response) => {
        this.respondentListState.add(res.data);
        loading.dismiss();
        this.showSuccessMessage(res);
      },
      (err) => {
        loading.dismiss();
        this.errorService.showMessage(err);
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Silakan cek kembali isian form.",
      duration: 2000,
      position: "bottom",
    });
    toast.present();
  }

  async showSuccessMessage(res) {
    const alert = await this.alertController.create({
      header: "Berhasil",
      message: res.message ? res.message : res,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/app/tabs/respondent-list");
          },
        },
      ],
    });

    await alert.present();
  }

  async capturePhoto() {
    this.capturedPhoto = await this.photoService.capturePhoto();
    this.photoSrc = this.sanitizer.bypassSecurityTrustUrl(
      this.capturedPhoto.webPath
    );

    console.log(this.capturedPhoto);
  }
}
