import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {

  constructor(private renderer: Renderer2) {}

  toggleTheme() {
    const theme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.addClass(document.body, theme);
  }
}
