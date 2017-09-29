import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Personnes } from './personnes.model';
import { PersonnesPopupService } from './personnes-popup.service';
import { PersonnesService } from './personnes.service';

@Component({
    selector: 'jhi-personnes-delete-dialog',
    templateUrl: './personnes-delete-dialog.component.html'
})
export class PersonnesDeleteDialogComponent {

    personnes: Personnes;

    constructor(
        private personnesService: PersonnesService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personnesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personnesListModification',
                content: 'Deleted an personnes'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('blogApp.personnes.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-personnes-delete-popup',
    template: ''
})
export class PersonnesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personnesPopupService: PersonnesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.personnesPopupService
                .open(PersonnesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
