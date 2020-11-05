import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { AuthService } from "../../services/auth/auth.service";
import { ErrorService } from "../../services/error/error.service";
import { UserData } from "../../interfaces/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: UserData;
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private authService: AuthService,
    private errorService: ErrorService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  async login() {

    this.loading = true;

    await this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.storage.set("token", res.token);
        this.storage.set("user", res.data);

        this.authService.setLoggedInState(true);
        this.loading = false;
        this.router.navigateByUrl("/app/tabs/survey-list");
      },
      (err: any) => {
        this.loading = false;
        this.errorService.showMessage(err);
      }
    );
  }
}
