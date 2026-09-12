import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { AuthHeader } from "../../headers/auth-header/auth-header";
import { AuthFooter } from "../../footers/auth-footer/auth-footer";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthHeader, AuthFooter],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

}
