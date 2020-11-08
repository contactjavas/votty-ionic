import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage";

import { Subscription, from } from "rxjs";
import { Plugins, StatusBarStyle } from "@capacitor/core";

import { Menu } from './classes/menu/menu';
import { AuthService } from './services/auth/auth.service';
import { AppService } from "./services/app/app.service";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  isStatusBarLight = true;
  menus: object[] = [];
  subscription: Subscription;

  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private menu: Menu,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.initializeApp();
    this.subscribeState();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();

      if (this.platform.is("hybrid")) {
        StatusBar.setStyle({
          style: this.isStatusBarLight
            ? StatusBarStyle.Dark
            : StatusBarStyle.Light,
        });
      }
    });

    this.storage.get("token").then((token) => {
      if (token) {
        this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
          "Authorization",
          "Bearer " + token
        );

        this.menus = this.menu.loggedIn;

        if (this.router.url === '/login') {
          this.router.navigateByUrl("/app");
        }        
      } else {
        this.menus = this.menu.notLoggedIn;
        this.router.navigateByUrl("/login");
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  subscribeState() {
    this.subscription = this.authService
      .getLoggedInState()
      .subscribe((isLoggedIn: Boolean) => {
        if (isLoggedIn) {
          this.menus = this.menu.loggedIn;
        } else {
          this.menus = this.menu.notLoggedIn;
        }
      });
  }

  callFunction(f: any) {
    this[f]();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
