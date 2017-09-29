import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content-detail',
    templateUrl: './content-detail.component.html'
})
export class ContentDetailComponent implements OnInit, OnDestroy {

    content: Content;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contentService: ContentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContents();
    }

    load(id) {
        this.contentService.find(id).subscribe((content) => {
            this.content = content;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contentListModification',
            (response) => this.load(this.content.id)
        );
    }
}
