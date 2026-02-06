import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PortfolioContent } from '../models/content.model';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private contentUrl = 'assets/data/content.json';

    // Cache the content so we don't fetch it multiple times
    private content$: Observable<PortfolioContent> | null = null;

    constructor(private http: HttpClient) { }

    getContent(): Observable<PortfolioContent> {
        if (!this.content$) {
            this.content$ = this.http.get<PortfolioContent>(this.contentUrl).pipe(
                shareReplay(1)
            );
            this.content$.subscribe({
                next: () => console.log('Content loaded successfully'),
                error: (err) => console.error('Failed to load content:', err)
            });
        }
        return this.content$;
    }
}
