import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Storage } from "@ionic/storage";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

import { Response } from "../../interfaces/response";

import { ErrorService } from "src/app/services/error/error.service";
import { SurveyService } from "src/app/services/survey/survey.service";
import { VoteService } from "src/app/services/vote/vote.service";
import { VoteListState } from "src/app/stores/vote-list/vote-list-state";
import { SurveyData } from "src/app/interfaces/survey";
import { SurveyListState } from "src/app/stores/survey-list/survey-list-state";
import { take } from "rxjs/operators";

@Component({
  selector: "app-input-survey",
  templateUrl: "./input-survey.page.html",
  styleUrls: ["./input-survey.page.scss"],
})
export class InputSurveyPage implements OnInit {
  surveyDetailSet: any; // Really, this is dynamic.
  inputSurveyForm: FormGroup;
  surveyId: number;
  survey: SurveyData;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public errorService: ErrorService,
    public surveyService: SurveyService,
    public voteService: VoteService,
    private surveyListState: SurveyListState,
    private voteListState: VoteListState
  ) {
    this.inputSurveyForm = this.formBuilder.group({
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
    this.surveyId = Number(this.route.snapshot.paramMap.get("surveyId"));

    this.surveyListState
      .get()
      .pipe(take(1))
      .subscribe((surveyList: SurveyData[]) => {
        this.survey = surveyList.find((survey) => {
          return Number(survey.id) === this.surveyId;
        });
      });

    this.loadForm();
  }

  async loadForm() {
    const loading = await this.loadingController.create({
      message: "Loading...",
    });

    await loading.present();

    this.surveyService.fetchDetailSet(this.surveyId).subscribe(
      (res) => {
        this.surveyDetailSet = res.data;

        loading.dismiss();
      },
      (err) => {
        loading.dismiss();
        this.errorService.showMessage(err);
      }
    );
  }

  async onSubmit() {
    if (!this.inputSurveyForm.valid) {
      this.presentToast();
      return;
    }

    /**
     * We copy the values info to "data",
     * so that we can modify the values without affecting the field's values.
     */
    let data = this.inputSurveyForm.value;

    const loading = await this.loadingController.create({
      message: "Processing...",
    });

    await loading.present();

    this.voteService.add(data).subscribe(
      (res: Response) => {
        this.voteListState.add(res.data);
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
            this.router.navigateByUrl("/app/tabs/vote-list");
          },
        },
      ],
    });

    await alert.present();
  }
}
