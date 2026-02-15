import { Component, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { environment } from '../../../environments/environment';

declare const grecaptcha: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white" data-aos="fade-up">
          Get In Touch
        </h2>
        <p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          I am actively seeking a Full-Stack Web Developer position. If you are hiring, I would be glad to discuss how my skills in frontend, backend, and web security can contribute to your team.
        </p>

        <div class="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          
          <!-- Contact Info -->
          <div class="w-full md:w-1/3 space-y-8" data-aos="fade-right">
             <!-- <div class="flex items-start space-x-4">
               <div class="p-3 bg-primary/10 rounded-lg text-primary">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               </div>
               <div>
                 <h3 class="text-lg font-bold text-gray-900 dark:text-white">Email</h3>
                 <a href="mailto:[EMAIL_ADDRESS]" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">[EMAIL_ADDRESS]</a>
               </div>
             </div> -->

             <div class="flex items-start space-x-4">
               <div class="p-3 bg-primary/10 rounded-lg text-primary">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               </div>
               <div>
                 <h3 class="text-lg font-bold text-gray-900 dark:text-white">Location</h3>
                 <p class="text-gray-600 dark:text-gray-400">Tunisia</p>
               </div>
             </div>

             <div class="flex items-start space-x-4">
               <div class="p-3 bg-primary/10 rounded-lg text-primary">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 0a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4 0a4 4 0 10-5.656-5.656l-1.1 1.1"/></svg>
               </div>
               <div>
                 <h3 class="text-lg font-bold text-gray-900 dark:text-white">Social</h3>
                 <div class="flex space-x-4 mt-2">
                   <a href="https://linkedin.com/in/rami-ben-othmen" target="_blank" class="text-gray-500 hover:text-primary transition-colors">LinkedIn</a>
                   <a href="https://github.com/RBenOthmen" target="_blank" class="text-gray-500 hover:text-primary transition-colors">GitHub</a>
                 </div>
               </div>
             </div>
          </div>

          <!-- Form -->
          <div class="w-full md:w-2/3" data-aos="fade-left">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input type="text" id="name" formControlName="name" 
                         class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                         placeholder="Your Name"
                  >
                  <!-- <div *ngIf="contactForm.get('name')?.touched && contactForm.get('name')?.invalid" class="text-red-500 text-xs mt-1">Name is required</div> -->
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" id="email" formControlName="email"
                         class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                         placeholder="your@email.com"
                  >
                  <div *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid" class="text-red-500 text-xs mt-1">Valid email is required</div>
                </div>
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input type="text" id="subject" formControlName="subject"
                       class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                       placeholder="Project Inquiry"
                >
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea id="message" formControlName="message" rows="5"
                          class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Tell me about your project..."
                ></textarea>
                <div *ngIf="contactForm.get('message')?.touched && contactForm.get('message')?.invalid" class="text-red-500 text-xs mt-1">Message is required</div>
              </div>

              <!-- reCAPTCHA Container -->
              <div class="mb-4">
                 <div #recaptchaContainer></div>
                 <div *ngIf="recaptchaError" class="text-red-500 text-xs mt-1">Please complete the captcha</div>
              </div>

              <button type="submit" 
                      [disabled]="contactForm.invalid || isSubmitting"
                      class="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
              >
                <span *ngIf="!isSubmitting">Send Message</span>
                <span *ngIf="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              </button>
              
              <div *ngIf="submitStatus === 'success'" class="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center font-medium">
                Message sent successfully! I'll get back to you soon.
              </div>
              <div *ngIf="submitStatus === 'error'" class="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center font-medium">
                Failed to send message. Please try again.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Ensure recaptcha fits in dark mode */
    :host ::ng-deep iframe[title="reCAPTCHA"] {
      border-radius: 4px;
      overflow: hidden;
    }
  `]
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  recaptchaToken: string | null = null;
  recaptchaError = false;

  constructor(private fb: FormBuilder, private emailService: EmailService, private ngZone: NgZone) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.renderRecaptcha();
  }

  renderRecaptcha() {
    if (typeof grecaptcha !== 'undefined') {
      try {
        grecaptcha.render(this.recaptchaContainer.nativeElement, {
          'sitekey': '6Lfa_GssAAAAAJuYUy2cGQuTHY24ixKD8QadsENy',
          'callback': (token: string) => {
            this.ngZone.run(() => {
              this.recaptchaToken = token;
              this.recaptchaError = false;
            });
          },
          'expired-callback': () => {
            this.ngZone.run(() => {
              this.recaptchaToken = null;
            });
          }
        });
      } catch (e) {
        console.error('reCAPTCHA render error:', e);
      }
    } else {
      setTimeout(() => this.renderRecaptcha(), 1000);
    }
  }

  onSubmit() {
    if (!this.recaptchaToken) {
      this.recaptchaError = true;
      return;
    }

    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const formData = this.contactForm.value;

      this.emailService.sendEmail(formData, this.recaptchaToken).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitStatus = 'success';
          this.contactForm.reset();
          try {
            grecaptcha.reset();
          } catch (e) { }
          this.recaptchaToken = null;
        },
        error: () => {
          this.isSubmitting = false;
          this.submitStatus = 'error';
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
