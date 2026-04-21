import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DockerResource} from '../common/interface/docker-resource';
import {ContactUsSubmitFeedback} from '../common/interface/contact-us-submit-feedback';
import {ContactUsFeedback} from '../common/interface/contact-us-feedback';
import {ContactUsFeedbackStatus} from '../common/interface/contact-us-feedback-status';

@Injectable({
  providedIn: 'root',
})
export class Nullinside {
  private httpClient = inject(HttpClient);

  getVirtualMachines(): Observable<DockerResource[]> {
    return this.httpClient.get<DockerResource[]>(`${environment.apiUrl}/docker`);
  }

  setVirtualMachinePowerState(id: number, turnOn: boolean): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/docker/${id}`, {turnOn: turnOn});
  }

  getAllSubmittedContactUsFeedback(): Observable<ContactUsFeedback[]> {
    return this.httpClient.get<ContactUsFeedback[]>(`${environment.apiUrl}/contactus`).pipe(
      map(feedback => feedback.map(item => ({
        ...item,
        status: item.status,
        timestamp: new Date(`${item.timestamp}z`),
        comments: item.comments.map(comment => ({
          ...comment,
          timestamp: new Date(`${comment.timestamp}z`)
        }))
      })))
    );
  }

  getAllSubmittedContactUsFeedbackAdmin(): Observable<ContactUsFeedback[]> {
    return this.httpClient.get<ContactUsFeedback[]>(`${environment.apiUrl}/contactus/admin`).pipe(
      map(feedback => feedback.map(item => ({
        ...item,
        status: item.status,
        timestamp: new Date(`${item.timestamp}z`),
        comments: item.comments.map(comment => ({
          ...comment,
          timestamp: new Date(`${comment.timestamp}z`)
        }))
      })))
    );
  }

  getSubmittedContactUsFeedback(id: number): Observable<ContactUsFeedback> {
    return this.httpClient.get<ContactUsFeedback>(`${environment.apiUrl}/contactus/${id}`).pipe(
      map(feedback => ({
        ...feedback,
        status: feedback.status,
        timestamp: new Date(`${feedback.timestamp}z`),
        comments: feedback.comments.map(comment => ({
          ...comment,
          timestamp: new Date(`${comment.timestamp}z`)
        }))
      }))
    );
  }

  addNewContactUsFeedback(feedback: ContactUsSubmitFeedback): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/contactus`, feedback);
  }

  addContactUsFeedbackComment(id: number, comment: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/contactus/${id}/comment`, {comment: comment});
  }

  updateContactUsFeedbackStatus(id: number, status: ContactUsFeedbackStatus): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.apiUrl}/contactus/${id}/status`, {status: status});
  }
}
