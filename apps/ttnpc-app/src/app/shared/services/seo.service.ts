import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';
import { Settings } from '../models/settings.model';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private title = 'Lectoform Consulting';
    settings: Settings;

    constructor(
        private titleService: Title,
        private metaTagsService: Meta,
        private meta: Meta,
        private appService: AppService
    ) {
        this.settings = this.appService.settings || null;
    }

    setTtile(title, setFull = false) {
        if (setFull) {
            this.titleService.setTitle(`${title}`);
        } else {
            this.titleService.setTitle(`${title} - ${this.title}`);
        }
    }

    setMetaTag(name, content) {
        this.meta.addTag({ name: name, content: content });
    }

    setMetaTags() {
        this.setMetaTag('author', this.settings &&
            this.settings.meta &&
            this.settings.meta.author ?
            this.settings.meta.author :
            'Lectoform Consulting SRL');

        this.setRobots(this.settings &&
            this.settings.meta &&
            this.settings.meta.robots ?
            this.settings.meta.robots :
            'noindex, nofollow');
    }

    setRobots(content) {
        this.metaTagsService.addTag({ name: 'robots', content: content });
    }


}