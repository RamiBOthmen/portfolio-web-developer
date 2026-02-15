import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { PortfolioContent } from '../../models/content.model';

@Component({
   selector: 'app-certifications',
   standalone: true,
   imports: [CommonModule],
   template: `
    <section id="certifications" class="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div class="container mx-auto px-4" *ngIf="content">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white" data-aos="fade-up">
          Certifications
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
           <div *ngFor="let cert of content.certifications; let i = index" 
                class="group bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                [attr.data-aos]="'zoom-in'"
                [attr.data-aos-delay]="i * 100"
           >
              <div class="flex items-start justify-between mb-4">
                 <div class="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm w-32 h-32 mx-auto flex items-center justify-center">
                    <img *ngIf="cert.image" [src]="cert.image" [alt]="cert.name" class="w-full h-full object-contain">
                 </div>
              </div>

              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                 {{ cert.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                 Issued by {{ cert.issuer }} In {{ cert.date }}
              </p>

              <a [href]="cert.verificationLink || '#'" 
                 class="inline-flex items-center text-sm font-medium text-primary hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
                 target="_blank"
              >
                 Verify Credential 
                 <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
           </div>
        </div>

      </div>
    </section>
  `
})
export class CertificationsComponent implements OnInit {
   content: PortfolioContent | null = null;
   constructor(private contentService: ContentService) { }
   ngOnInit() {
      this.contentService.getContent().subscribe(data => this.content = data);
   }
}
