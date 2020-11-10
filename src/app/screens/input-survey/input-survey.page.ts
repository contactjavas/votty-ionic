import { Component, Input, OnInit } from "@angular/core";
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
import { VoteListStateService } from "src/app/states/vote-list/vote-list-state.service";
import { SurveyListStateService } from "src/app/states/survey-list/survey-list-state.service";

import { SurveyData } from "src/app/interfaces/survey";
import { IdTitlePairData, valueLabelPairData } from "src/app/interfaces/pairs";

declare var Awesomplete;

@Component({
  selector: "app-input-survey",
  templateUrl: "./input-survey.page.html",
  styleUrls: ["./input-survey.page.scss"],
})
export class InputSurveyPage implements OnInit {
  questions: any;
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
    private surveyListState: SurveyListStateService,
    private voteListState: VoteListStateService
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

  setupAutocomplete() {
    const ajax = new XMLHttpRequest();
    const field: any = document.querySelector(
      ".respondent-autocomplete .native-input"
    );
    const ajaxUrl =
      "https://votty-survey.diggy.id/api/awesomplete/respondent/search/{query}/";
    const thisClass = this;

    if (!field) return;

    let autocomplete: any;
    let opts: any = {};

    const sendRequest = (query: string) => {
      const url = ajaxUrl.replace("{query}", query);
      opts.list = [];

      ajax.abort();

      ajax.open("GET", url, true);
      ajax.send();
      ajax.onload = () => {
        const response = JSON.parse(ajax.responseText);
        const result = response.message ? response.data : response;

        autocomplete.list = result;

        autocomplete.evaluate();
      };
    };

    field.addEventListener("keyup", (e: any) => {
      if (
        e.key === "Escape" ||
        e.key === "Esc" ||
        e.keyCode === 27 ||
        e.key === "Enter" ||
        e.keyCode === 13 ||
        e.key === "ArrowDown" ||
        e.keyCode === 40 ||
        e.key === "ArrowUp" ||
        e.keyCode === 38
      ) {
        return;
      }

      sendRequest(field.value);
    });

    opts.replace = (suggestion: valueLabelPairData) => {
      field.value = suggestion.label;
      field.dataset.respondentId = suggestion.value;
    };

    autocomplete = new Awesomplete(field, opts);
  }

  async loadForm() {
    const loading = await this.loadingController.create({
      message: "Loading...",
    });

    await loading.present();

    this.surveyService.fetchDetailSet(this.surveyId).subscribe(
      (res) => {
        let fields: any = {};

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

        setTimeout(this.setupAutocomplete, 250);
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

    console.log(data);

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        // If question_type_id is 1 (select some from choices)
        if (typeof data[prop] == "string" && !isNaN(data[prop])) {
          data[prop] = Number(data[prop]);
        } else {
          // If question_type_id is 3 (text input, not choices)
          if (typeof data[prop] == "string") {
            // We don't handle text input question.
          } else {
            // If question_type_id is 2 (select one from choices)
            let selectedChoices = [];

            for (const key in data[prop]) {
              if (data[prop].hasOwnProperty(key)) {
                const id = Number(key.replace("choice_", ""));

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

    const autocompleteField: any = document.querySelector(
      ".respondent-autocomplete .native-input"
    );

    data.respondent_id = Number(autocompleteField.dataset.respondentId);

    console.log(data);

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
