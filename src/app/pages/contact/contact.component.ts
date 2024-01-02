import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { MailService, SendMailResponse } from 'src/app/services/mail.service';
import VanillaTilt from "vanilla-tilt";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  emailFormSending = false;
  emailFormSubmitted = false;
  emailForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    subject: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    message: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]),
  })

  private emailSent = false;

  constructor(private el: ElementRef,
    private recaptchaV3Service: ReCaptchaV3Service,
    private mailService: MailService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".contact-pic"), { max: 20, speed: 300, scale: 1.05 }
    );
  }

  async onSubmit() {

    if (this.emailSent) {
      this.toastr.warning('You have already sent the message');
      return;
    }

    this.emailFormSubmitted = true;
    
    if (this.emailForm.valid) {
      const captchaToken = await firstValueFrom(this.recaptchaV3Service.execute("send_email"))

      this.emailFormSending = true;
      
      this.mailService.SendEmail({
        captchaToken: captchaToken,
        messageContent: this.message!.value!,
        messageSubject: this.subject!.value!,
        senderEmail: this.email!.value!,
        senderName: this.name!.value!
      }).subscribe({
        next: (response: SendMailResponse) => {
          this.emailSent = true;
          this.emailFormSending = false;
          this.toastr.success('Message is sent');
        },
        error: (err) => {
          this.emailFormSending = false;
          this.toastr.error('Something wrong. Try again later');
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
