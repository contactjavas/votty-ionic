import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Storage } from "@ionic/storage";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

import { Response } from "../../interfaces/response";
import { take } from "rxjs/operators";

import { ErrorService } from "src/app/services/error/error.service";
import { SurveyService } from "src/app/services/survey/survey.service";
import { VoteService } from "src/app/services/vote/vote.service";
import { VoteListState } from "src/app/stores/vote-list/vote-list-state";
import { SurveyListState } from "src/app/stores/survey-list/survey-list-state";

import { SurveyData } from "src/app/interfaces/survey";
import { IdTitlePairData } from "src/app/interfaces/pairs";

@Component({
  selector: "app-input-survey",
  templateUrl: "./input-survey.page.html",
  styleUrls: ["./input-survey.page.scss"],
})
export class InputSurveyPage implements OnInit {
  questions: any; // Really, this is dynamic.
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
  ) {}

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
        let fields = {};

        // We need to use this after inputSurveyForm declaration after the loop.
        let choiceControls = [];

        res.data.forEach((question: any) => {
          if (question.question_type_id == 1) {
            fields["question_choice_" + question.id] = [
              "",
              Validators.required,
            ];
          } else if (question.question_type_id == 2) {
            let controls = [];

            question.choices.forEach((choice: IdTitlePairData) => {
              controls.push(false);
            });

            fields["question_choices_" + question.id] = this.formBuilder.group(
              {}
            );

            // Lets collect the data so we can loop it later after inputSurveyForm declaration.
            choiceControls.push({
              questionId: question.id,
              choices: question.choices,
            });
          }
        });

        this.inputSurveyForm = this.formBuilder.group(fields);

        // Now inject the controls to the related inputSurveyForm's controls.
        choiceControls.forEach((choiceControl) => {
          const checkboxes = <FormGroup>(
            this.inputSurveyForm.get(
              "question_choices_" + choiceControl.questionId
            )
          );

          choiceControl.choices.forEach((choice: IdTitlePairData) => {
            checkboxes.addControl(
              "choice_" + choice.id.toString(),
              new FormControl(false)
            );
          });
        });

        this.questions = res.data;

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
     * so that we can modify the values without affecting the original values.
     */
    let data = this.inputSurveyForm.value;

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {

        // If question_type_id is 1 (select some from choices)
        if (typeof data[prop] == 'string' && !isNaN(data[prop])) {
          data[prop] = Number(data[prop]);
        } else {
          // If question_type_id is 3 (text input, not choices)
          if (typeof data[prop] == 'string') {
            // We don't handle text input question.
          } else {
            // If question_type_id is 2 (select one from choices)
            let selectedChoices = [];
            
            for (const key in data[prop]) {
              if (data[prop].hasOwnProperty(key)) {
                const id = Number(key.replace('choice_', ''));

                if (data[prop][key]) {
                  selectedChoices.push(id);
                }
              }
            }

            // Convert the value, from object to array.
            data[prop] = selectedChoices;
          }
        }

      }
    }

    const loading = await this.loadingController.create({
      message: "Processing...",
    });

    await loading.present();

    this.voteService.add(this.surveyId, data).subscribe(
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
