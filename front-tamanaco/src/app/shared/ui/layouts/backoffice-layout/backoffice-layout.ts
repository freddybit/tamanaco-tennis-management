import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackofficeFooter } from "../../footers/backoffice-footer/backoffice-footer";
import { BackofficeSidebar } from "../../sidebars/backoffice-sidebar/backoffice-sidebar";

@Component({
  selector: 'backoffice-layout',
  imports: [RouterOutlet, BackofficeFooter, BackofficeSidebar],
  templateUrl: './backoffice-layout.html',
  styleUrls: ['./backoffice-layout.css'],
})
export class BackofficeLayout {

}
