import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { PortfolioContent } from '../../models/content.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div class="container mx-auto px-4" *ngIf="content">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white" data-aos="fade-up">
          About Me
        </h2>

        <div class="flex flex-col md:flex-row items-center gap-12">
          
          <!-- Image Column -->
          <div class="w-full md:w-1/3 flex justify-center" data-aos="fade-right">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
              <img [src]="content.personal.profileImage || 'assets/images/profile_pictures/rami_desk.png'" 
                   alt="Profile" 
                   class="relative w-64 h-80 object-cover rounded-xl shadow-2xl transform transition duration-500 group-hover:scale-105"
              >
            </div>
          </div>

          <!-- Content Column -->
          <div class="w-full md:w-2/3" data-aos="fade-left">
            <h3 class="text-2xl font-semibold mb-4 text-primary">
              {{ content.personal.tagline }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
              {{ content.personal.about }}
            </p>

            <!-- Highlights -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary">
                <h4 class="font-bold text-gray-900 dark:text-white">Top of Class</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Engineering of Info Systems (2024)</p>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-secondary">
                <h4 class="font-bold text-gray-900 dark:text-white">AI Specialist</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Integrated Gemini & Azure AI in projects</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-8">
              <!-- Languages -->
              <div class="flex-1">
                <h4 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white border-b pb-2 dark:border-slate-600">Languages</h4>
                <ul class="space-y-2">
                  <li *ngFor="let lang of content.personal['languages']" class="flex items-center justify-between">
                    <span class="text-gray-700 dark:text-gray-300 flex items-center">
                      <span class="mr-2 text-xl">{{ lang.flag }}</span> {{ lang.name }}
                    </span>
                    <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-gray-600 dark:text-gray-400">
                      {{ lang.level }}
                    </span>
                  </li>
                </ul>
              </div>

              <!-- Interests -->
              <div class="flex-1">
                <h4 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white border-b pb-2 dark:border-slate-600">Interests</h4>
                <div class="flex flex-wrap gap-2">
                  <span *ngFor="let interest of content.personal['interests']" 
                        class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm flex items-center">
                    <span class="mr-1">{{ interest.icon }}</span> {{ interest.name }}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent implements OnInit {
  content: PortfolioContent | null = null;
  constructor(private contentService: ContentService) { }
  ngOnInit() {
    this.contentService.getContent().subscribe(data => this.content = data);
  }
}
