import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { firstValueFrom } from 'rxjs';
import { MailService, SendMailResponse } from 'src/app/services/mail.service';
import VanillaTilt from "vanilla-tilt";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  emailFormSubmitted = false;
  emailForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    subject: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    message: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
  })

  constructor(private el: ElementRef,
    private recaptchaV3Service: ReCaptchaV3Service,
    private mailService: MailService) {
  }

  ngOnInit(): void {
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".contact-pic"), { max: 20, speed: 300, scale: 1.05 }
    );
  }

  async onSubmit() {
    this.emailFormSubmitted = true;
    if (this.emailForm.valid) {
      debugger;
      const captchaToken = await firstValueFrom(this.recaptchaV3Service.execute("send_email"))

      this.mailService.SendEmail({
        captchaToken: captchaToken,
        messageContent: this.message!.value!,
        messageSubject: this.subject!.value!,
        senderEmail: this.email!.value!,
        senderName: this.name!.value!
      }).subscribe({
        next: (response: SendMailResponse) => {
          console.log("message send: ", response)
        },
        error: (err) => {
          console.log("Unexpecetd error: ", err)
        }
      })
    }
  }

  get name() {
    return this.emailForm.get('name');
  }

  get email() {
    return this.emailForm.get('email');
  }

  get subject() {
    return this.emailForm.get('subject');
  }

  get message() {
    return this.emailForm.get('message');
  }
}
