import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Personnes } from './personnes.model';
import { PersonnesPopupService } from './personnes-popup.service';
import { PersonnesService } from './personnes.service';

@Component({
    selector: 'jhi-personnes-dialog',
    templateUrl: './personnes-dialog.component.html'
})
export class PersonnesDialogComponent implements OnInit {

    personnes: Personnes;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private personnesService: PersonnesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.personnes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personnesService.update(this.personnes), false);
        } else {
            this.subscribeToSaveResponse(
                this.personnesService.create(this.personnes), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Personnes>, isCreated: boolean) {
        result.subscribe((res: Personnes) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Personnes, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'blogApp.personnes.created'
            : 'blogApp.personnes.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'personnesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-personnes-popup',
    template: ''
})
export class PersonnesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personnesPopupService: PersonnesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.personnesPopupService
                    .open(PersonnesDialogComponent, params['id']);
            } else {
                this.modalRef = this.personnesPopupService
                    .open(PersonnesDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
