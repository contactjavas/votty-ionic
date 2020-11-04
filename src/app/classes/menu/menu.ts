import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Menu {
  loggedIn = [
    {
      text: "Keluar",
      icon: "log-out",
      click: "logout",
    },
  ];

  notLoggedIn = [
    {
      text: "Login",
      url: "/login",
      icon: "log-in",
      direction: "forward",
    },
  ];
}
