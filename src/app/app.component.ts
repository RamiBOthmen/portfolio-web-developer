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
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, HeroComponent, AboutComponent, SkillsComponent, ProjectsComponent, TimelineComponent, CertificationsComponent, ContactComponent],
  template: `
    <app-header></app-header>
    <main class="pt-16 min-h-screen">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-timeline></app-timeline>
      <app-certifications></app-certifications>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) { }

  ngOnInit() {
    this.setupSEO();
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      offset: 100
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
