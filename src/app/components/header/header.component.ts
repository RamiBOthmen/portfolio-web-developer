import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, ThemeToggleComponent],
    template: `
    <header 
      class="fixed w-full top-0 z-50 transition-all duration-300"
      [class.bg-white/80]="isScrolled"
      [class.dark:bg-slate-900/80]="isScrolled"
      [class.backdrop-blur-md]="isScrolled"
      [class.shadow-md]="isScrolled"
      [class.py-4]="!isScrolled"
      [class.py-2]="isScrolled"
    >
      <div class="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <!-- Logo -->
        <a href="#" class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Rami<span class="text-gray-700 dark:text-gray-200">.Dev</span>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-8">
          <a *ngFor="let item of navItems" 
             [href]="item.href"
             class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium cursor-pointer"
             (click)="scrollToSection($event, item.href)"
          >
            {{ item.label }}
          </a>
          <app-theme-toggle></app-theme-toggle>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-4">
           <app-theme-toggle></app-theme-toggle>
           <button (click)="toggleMobileMenu()" class="text-gray-600 dark:text-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path *ngIf="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
               <path *ngIf="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <div *ngIf="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg border-t border-gray-100 dark:border-slate-800">
        <div class="flex flex-col py-4 px-4 space-y-4">
          <a *ngFor="let item of navItems" 
             [href]="item.href"
             class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium block"
             (click)="scrollToSection($event, item.href); toggleMobileMenu()"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
    isScrolled = false;
    isMobileMenuOpen = false;

    navItems = [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Projects', href: '#projects' },
        { label: 'Experience', href: '#timeline' },
        { label: 'Certifications', href: '#certifications' },
        { label: 'Contact', href: '#contact' }
    ];

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 20;
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    scrollToSection(event: Event, href: string) {
        event.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
