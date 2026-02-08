import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { PortfolioContent, Project } from '../../models/content.model';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section id="projects" class="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div class="container mx-auto px-4" *ngIf="content">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white" data-aos="fade-up">
          Featured Projects
        </h2>

        <!-- Filters -->
        <div class="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
          <button *ngFor="let cat of categories" 
                  (click)="filterProjects(cat)"
                  class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  [class.bg-primary]="activeCategory === cat"
                  [class.text-white]="activeCategory === cat"
                  [class.bg-gray-100]="activeCategory !== cat"
                  [class.text-gray-600]="activeCategory !== cat"
                  [class.dark:bg-slate-700]="activeCategory !== cat"
                  [class.dark:text-gray-300]="activeCategory !== cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let project of filteredProjects; let i = index" 
               class="group relative h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer perspective-container"
               [attr.data-aos]="'fade-up'"
               [attr.data-aos-delay]="i * 100"
          >
             <!-- Card Inner (3D Flip Effect implemented via CSS group-hover) -->
             <div class="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                
                <!-- Front Side -->
                <div class="absolute inset-0 backface-hidden">
                   <img [src]="project.image || 'assets/images/projects/placeholder.jpg'" 
                        [alt]="project.title"
                        class="w-full h-full object-cover"
                   >
                   <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <h3 class="text-2xl font-bold text-white mb-1">{{ project.title }}</h3>
                      <p class="text-gray-300">{{ project.subtitle }}</p>
                      <div class="flex flex-wrap gap-2 mt-3">
                         <span *ngFor="let tech of project.technologies.slice(0, 3)" class="text-xs px-2 py-1 bg-white/20 backdrop-blur rounded text-white">
                           {{ tech }}
                         </span>
                      </div>
                   </div>
                </div>

                <!-- Back Side -->
                <div class="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-slate-900 p-8 flex flex-col justify-center text-center">
                   <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ project.title }}</h3>
                   <p class="text-gray-600 dark:text-gray-300 mb-6">{{ project.description }}</p>
                   
                   <div class="flex justify-center space-x-4">
                      <!-- <a [href]="project.link" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-indigo-700 transition-colors" target="_blank">View Live</a> -->
                      <a [href]="project.repo" class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:border-primary hover:text-primary transition-colors" target="_blank">GitHub</a>
                   </div>

                   <div class="mt-8">
                      <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Technologies</h4>
                      <div class="flex flex-wrap justify-center gap-2">
                        <span *ngFor="let tech of project.technologies" class="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded">
                           {{ tech }}
                        </span>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>

      </div>
    </section>
  `,
    styles: [`
    .perspective-container {
      perspective: 1000px;
    }
    .transform-style-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    .group-hover\\:rotate-y-180:hover { /* Tailwind handles this with group-hover, but sometimes needs explicit css backup if config is strict */ }
  `]
})
export class ProjectsComponent implements OnInit {
    content: PortfolioContent | null = null;
    projects: Project[] = [];
    filteredProjects: Project[] = [];
    categories: string[] = ['All', 'Angular', 'Python', 'AI', 'Full Stack'];
    activeCategory = 'All';

    constructor(private contentService: ContentService) { }

    ngOnInit() {
        this.contentService.getContent().subscribe(data => {
            this.content = data;
            this.projects = data.projects;
            this.filteredProjects = data.projects;

            // Extract unique techs for categories could be dynamic, but static is easier for layout control
        });
    }

    filterProjects(category: string) {
        this.activeCategory = category;
        if (category === 'All') {
            this.filteredProjects = this.projects;
        } else {
            this.filteredProjects = this.projects.filter(p =>
                p.technologies.some(t => t.toLowerCase().includes(category.toLowerCase()))
            );
        }
    }
}
