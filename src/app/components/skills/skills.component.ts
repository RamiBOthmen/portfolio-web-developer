import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { PortfolioContent } from '../../models/content.model';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section id="skills" class="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div class="container mx-auto px-4" *ngIf="content">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white" data-aos="fade-up">
          Technical Skills
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let skillCat of content.skills; let i = index" 
               class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 hover:-translate-y-1"
               [ngClass]="getBorderColor(i)"
               [attr.data-aos]="'fade-up'"
               [attr.data-aos-delay]="i * 100"
          >
            <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span class="text-2xl mr-3">{{ getIcon(skillCat.category) }}</span>
              {{ skillCat.category }}
            </h3>
            
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let item of skillCat.items" 
                    class="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-default"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent implements OnInit {
    content: PortfolioContent | null = null;

    constructor(private contentService: ContentService) { }

    ngOnInit() {
        this.contentService.getContent().subscribe(data => this.content = data);
    }

    getBorderColor(index: number): string {
        const colors = [
            'border-blue-500',
            'border-green-500',
            'border-yellow-500',
            'border-red-500',
            'border-purple-500',
            'border-indigo-500'
        ];
        return colors[index % colors.length];
    }

    getIcon(category: string): string {
        switch (category.toLowerCase()) {
            case 'frontend': return '🎨';
            case 'backend': return '⚙️';
            case 'databases': return '💾';
            case 'security': return '🔒';
            case 'devops': return '🚀';
            case 'ai/ml': return '🤖';
            default: return '💻';
        }
    }
}
