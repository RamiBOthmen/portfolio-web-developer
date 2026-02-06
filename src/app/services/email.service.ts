import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    private apiUrl = '/api/send-email';

    constructor(private http: HttpClient) { }

    sendEmail(contactData: ContactForm, recaptchaToken: string): Observable<any> {
        // Development mode mock
        if (!environment.production && !environment.apiUrl) {
            console.log('DEV MODE: Email mock send', { contactData, recaptchaToken });
            return of({ success: true, message: 'Mock email sent' });
        }

        return this.http.post(this.apiUrl, {
            ...contactData,
            recaptchaToken
        }).pipe(
            catchError(error => {
                console.error('Email send failed', error);
                return throwError(() => new Error('Failed to send email. Please try again later.'));
            })
        );
    }
}
