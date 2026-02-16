import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { Meta, Title } from '@angular/platform-browser';
import { ContentService } from './services/content.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, TimelineComponent, CertificationsComponent, ContactComponent],
  template: `
    <app-header></app-header>
    <main class="pt-16 min-h-screen transition-opacity duration-500" [class.opacity-0]="!isLoaded" [class.pointer-events-none]="!isLoaded">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-timeline></app-timeline>
      <app-certifications></app-certifications>
      <app-contact></app-contact>
    </main>
    
    <!-- Loading State -->
    <div *ngIf="!isLoaded" class="fixed inset-0 z-40 bg-white dark:bg-slate-900 flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>

    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {
  isLoaded = false;

  constructor(
    private meta: Meta,
    private title: Title,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.setupSEO();

    // Wait for content 
    this.contentService.getContent().subscribe({
      next: () => {
        // Set loaded to show content
        this.isLoaded = true;

        // Wait for DOM to be visible for AOS and scroll calculations
        setTimeout(() => {
          // Initialize/Refresh AOS now that content is visible
          AOS.init({
            duration: 800,
            once: true,
            mirror: false,
            offset: 0
          });
          AOS.refresh();

          // Force a scroll event to trigger AOS for elements currently in view
          window.dispatchEvent(new Event('scroll'));

          // If there's a hash in the URL, scroll to it now that content is visible
          const hash = window.location.hash;
          if (hash) {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 200);
      },
      error: (err) => {
        console.error('Initial load failed', err);
        this.isLoaded = true;
      }
    });
  }

  private setupSEO() {
    this.title.setTitle('Rami Ben Othmen | Full-Stack Developer');
    this.meta.addTags([
      { name: 'description', content: 'Rami Ben Othmen - Full-Stack Developer specializing in AI applications and secure web development' },
      { name: 'keywords', content: 'Angular, ASP.NET Core, Python, AI, Web Developer, Tunisia' },
      { name: 'author', content: 'Rami Ben Othmen' },
      { property: 'og:title', content: 'Rami Ben Othmen | Full-Stack Developer' },
      { property: 'og:description', content: 'Portfolio showcasing AI-driven web applications and secure development projects' },
      { property: 'og:image', content: 'assets/images/profile.jpg' },
      { property: 'og:type', content: 'website' }
    ]);
  }
}
