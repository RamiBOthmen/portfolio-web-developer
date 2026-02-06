import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { PortfolioContent } from '../../models/content.model';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, NgxTypedJsModule],
    template: `
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      
      <!-- Background Shapes (CSS only for performance/simplicity, fallback if particles issues) -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 -left-40 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
      </div>

      <div class="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between" *ngIf="content">
        
        <!-- Text Content -->
        <div class="md:w-1/2 text-center md:text-left mb-12 md:mb-0" data-aos="fade-right">
          <p class="text-lg md:text-xl text-primary font-semibold mb-4">Hello, I'm</p>
          <h1 class="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            {{ content.personal.name }}
          </h1>
          
          <div class="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-12">
            <ngx-typed-js 
              [strings]="typingStrings" 
              [typeSpeed]="50" 
              [backSpeed]="30" 
              [loop]="true"
              [showCursor]="true"
            >
              <span class="typing"></span>
            </ngx-typed-js>
          </div>

          <p class="text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
            {{ content.personal.about }}
          </p>

          <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <a href="#projects" class="px-8 py-3 bg-primary hover:bg-indigo-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
              View Projects
            </a>
            <a href="#contact" class="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-full font-medium transition-all">
              Contact Me
            </a>
          </div>

          <div class="mt-12 flex items-center justify-center md:justify-start space-x-8">
            <div class="text-center">
              <span class="block text-3xl font-bold text-gray-900 dark:text-white">
                {{ content.personal.yearsExperience }}+
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Years Exp.</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-bold text-gray-900 dark:text-white">
                {{ content.personal.projectsCount }}+
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Projects</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-bold text-gray-900 dark:text-white">
                {{ content.personal.certificationsCount }}+
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Certs</span>
            </div>
          </div>
        </div>

        <!-- Profile Image -->
        <div class="md:w-1/2 flex justify-center sticky top-0" data-aos="fade-left">
          <div class="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <!-- Glowing Ring -->
            <div class="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin-slow"></div>
            <div class="absolute inset-2 rounded-full border-4 border-secondary/30 animate-spin-reverse-slow"></div>
            
            <!-- Image -->
            <div class="absolute inset-4 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              <img [src]="content.personal.profileImage || 'assets/images/profile.jpg'" 
                   alt="Profile" 
                   class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              >
            </div>
            
            <!-- Floating Skills Icons (Decorative) -->
            <div class="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center animate-bounce">
              <span class="text-xl">💻</span>
            </div>
            <div class="absolute -bottom-4 -left-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center animate-bounce" style="animation-delay: 1s">
              <span class="text-xl">🚀</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
    styles: [`
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse-slow {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 15s linear infinite;
    }
    .animate-spin-reverse-slow {
      animation: spin-reverse-slow 10s linear infinite;
    }
  `]
})
export class HeroComponent implements OnInit {
    content: PortfolioContent | null = null;
    typingStrings: string[] = [];

    constructor(private contentService: ContentService) { }

    ngOnInit() {
        this.contentService.getContent().subscribe(data => {
            this.content = data;
            this.typingStrings = [
                data.personal.title,
                data.personal.tagline,
                'Full-Stack Developer',
                'Problem Solver'
            ];
        });
    }
}
