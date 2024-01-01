import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SendMailRequest {
  captchaToken: Required<string>,
  senderName: Required<string>,
  senderEmail: Required<string>,
  messageSubject: Required<string>,
  messageContent: Required<string>
}

export interface SendMailResponse {
  responseCode: number,
  responseMessage: string
}

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  public SendEmail(sendMailRequest: SendMailRequest): Observable<SendMailResponse>{
    return this.http.post<SendMailResponse>(environment.api.sendMailUrl, sendMailRequest)
  }
}
