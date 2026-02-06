import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { PortfolioContent } from '../../models/content.model';

@Component({
    selector: 'app-timeline',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section id="timeline" class="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div class="container mx-auto px-4" *ngIf="content">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white" data-aos="fade-up">
          Experience & Education
        </h2>

        <div class="relative max-w-4xl mx-auto">
          <!-- Vertical Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-slate-700"></div>

          <!-- Experience Items -->
          <div *ngFor="let job of content.experience; let i = index" class="relative mb-8 w-full">
            <div class="flex items-center justify-between w-full"
                 [ngClass]="i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'"
            >
              <!-- Empty Space -->
              <div class="w-5/12"></div>

              <!-- Node -->
              <div class="z-20 flex items-center justify-center w-8 h-8 bg-primary rounded-full ring-4 ring-white dark:ring-slate-900 shadow">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>

              <!-- Content Card -->
              <div class="w-5/12" data-aos="fade-up">
                <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary">
                  <span class="text-sm text-primary font-bold">{{ job.period }}</span>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-1">{{ job.role }}</h3>
                  <h4 class="text-md text-gray-600 dark:text-gray-300 mb-2">{{ job.company }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ job.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Education Items (Continue line) -->
          <div *ngFor="let edu of content.education; let i = index" class="relative mb-8 w-full">
            <div class="flex items-center justify-between w-full"
                 [ngClass]="(i + content.experience.length) % 2 === 0 ? 'flex-row-reverse' : 'flex-row'"
            >
              <div class="w-5/12"></div>
              
              <div class="z-20 flex items-center justify-center w-8 h-8 bg-secondary rounded-full ring-4 ring-white dark:ring-slate-900 shadow">
                 <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>
              </div>

              <div class="w-5/12" data-aos="fade-up">
                <div class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-secondary">
                  <span class="text-sm text-secondary font-bold">{{ edu.period }}</span>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white mt-1">{{ edu.degree }}</h3>
                  <h4 class="text-md text-gray-600 dark:text-gray-300 mb-2">{{ edu.school }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400" *ngIf="edu.details">{{ edu.details }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class TimelineComponent implements OnInit {
    content: PortfolioContent | null = null;
    constructor(private contentService: ContentService) { }
    ngOnInit() {
        this.contentService.getContent().subscribe(data => this.content = data);
    }
}
