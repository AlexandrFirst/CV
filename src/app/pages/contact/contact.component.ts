import { Component, ElementRef, OnInit } from '@angular/core';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".contact-pic"), { max: 20, speed: 300, scale: 1.05 }
    );
  }
}