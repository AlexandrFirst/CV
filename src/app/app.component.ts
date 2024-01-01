import { Component, OnInit } from '@angular/core';
import tippy from 'tippy.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.initTooltip("info-link", "general info");
    this.initTooltip("experience-link", "experience");
    this.initTooltip("portfolio-link", "portfolio");
    this.initTooltip("contact-link", "contact");
  }

  private initTooltip(className: string, text: string) {
    tippy(`.${className}`, {
      content: text,
      arrow: false,
      placement: "top",
      animation: "scale",
      offset: [0, -15],
      theme: 'cv'
    })
  }

}
