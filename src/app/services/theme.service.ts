import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    darkMode = signal<boolean>(false);

    constructor() {
        this.initializeTheme();
    }

    toggleTheme() {
        this.darkMode.update(dark => !dark);
        this.updateClass();
    }

    private initializeTheme() {
        // Check local storage or system preference
        const isDark =
            localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.darkMode.set(isDark);
        this.updateClass();
    }

    private updateClass() {
        if (this.darkMode()) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
}
