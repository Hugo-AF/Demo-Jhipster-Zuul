import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Classe } from './classe.model';
import { ClasseService } from './classe.service';

@Component({
    selector: 'jhi-classe-detail',
    templateUrl: './classe-detail.component.html'
})
export class ClasseDetailComponent implements OnInit, OnDestroy {

    classe: Classe;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private classeService: ClasseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClasses();
    }

    load(id) {
        this.classeService.find(id).subscribe((classe) => {
            this.classe = classe;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'classeListModification',
            (response) => this.load(this.classe.id)
        );
    }
}
