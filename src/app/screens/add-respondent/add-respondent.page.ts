import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Storage } from "@ionic/storage";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

import { format, parseISO } from "date-fns";

import { RespondentService } from "src/app/services/respondent/respondent.service";
import { ErrorService } from "src/app/services/error/error.service";
import { PhotoService } from "src/app/services/photo/photo.service";
import { AddRespondentFormData } from "src/app/interfaces/form";

@Component({
  selector: "app-add-respondent",
  templateUrl: "./add-respondent.page.html",
  styleUrls: ["./add-respondent.page.scss"],
})
export class AddRespondentPage implements OnInit {
  addFormData: AddRespondentFormData;
  addRespondentForm: FormGroup;
  formData: any;
  token: string;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    public errorService: ErrorService,
    public respondentService: RespondentService,
    public photoService: PhotoService
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
          console.log(res.data);

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
     * We copy the values info this.formData,
     * so that we can modify the values without affecting the field's values.
     */
    this.formData = this.addRespondentForm.value;

    const loading = await this.loadingController.create({
      message: "Processing...",
    });

    await loading.present();

    this.respondentService.add(this.token, this.formData).subscribe(
      (res) => {
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
      position: 'bottom'
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
            this.router.navigateByUrl("/app/tabs/orders");
          },
        },
      ],
    });

    await alert.present();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
