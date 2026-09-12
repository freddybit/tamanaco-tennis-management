import { Component, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'backoffice-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './backoffice-sidebar.html',
  styleUrl: './backoffice-sidebar.css',
})
export class BackofficeSidebar {
  constructor(private renderer: Renderer2) {}

  toggleSubMenu(sidebar: HTMLElement, submenu: HTMLElement, btn: HTMLElement): void {
    if (!submenu || !btn) return;

    // Comprobamos si ya tiene la clase para ponerla o quitarla (Toggle)
    if (submenu.classList.contains('show')) {
      this.renderer.removeClass(submenu, 'show');
      this.renderer.removeClass(btn, 'rotate');
    } else {
      this.renderer.addClass(submenu, 'show');
      this.renderer.addClass(btn, 'rotate');
    }

    if (sidebar.classList.contains('close')) {
      this.renderer.removeClass(sidebar, 'close');
      this.renderer.addClass(btn, 'rotate');
    }
  }

  toggleSideBar(sidebar: HTMLElement, btn: HTMLElement): void {
    if (!sidebar) return;

    if (sidebar.classList.contains('close')) {
      this.renderer.removeClass(sidebar, 'close');
      this.renderer.removeClass(btn, 'rotate');
    } else {
      this.renderer.addClass(sidebar, 'close');
      this.renderer.addClass(btn, 'rotate');
      Array.from(sidebar.getElementsByClassName('show')).forEach((ul) => {
        ul.classList.remove('show');
        ul.previousElementSibling?.classList.remove('rotate');
      });
    }
  }
}
