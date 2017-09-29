import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Personnes } from './personnes.model';
import { PersonnesService } from './personnes.service';

@Component({
    selector: 'jhi-personnes-detail',
    templateUrl: './personnes-detail.component.html'
})
export class PersonnesDetailComponent implements OnInit, OnDestroy {

    personnes: Personnes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personnesService: PersonnesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonnes();
    }

    load(id) {
        this.personnesService.find(id).subscribe((personnes) => {
            this.personnes = personnes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonnes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personnesListModification',
            (response) => this.load(this.personnes.id)
        );
    }
}
