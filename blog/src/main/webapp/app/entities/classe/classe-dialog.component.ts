import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Classe } from './classe.model';
import { ClassePopupService } from './classe-popup.service';
import { ClasseService } from './classe.service';

@Component({
    selector: 'jhi-classe-dialog',
    templateUrl: './classe-dialog.component.html'
})
export class ClasseDialogComponent implements OnInit {

    classe: Classe;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private classeService: ClasseService,
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
        if (this.classe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classeService.update(this.classe), false);
        } else {
            this.subscribeToSaveResponse(
                this.classeService.create(this.classe), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Classe>, isCreated: boolean) {
        result.subscribe((res: Classe) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Classe, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'blogApp.classe.created'
            : 'blogApp.classe.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'classeListModification', content: 'OK'});
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
    selector: 'jhi-classe-popup',
    template: ''
})
export class ClassePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classePopupService: ClassePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.classePopupService
                    .open(ClasseDialogComponent, params['id']);
            } else {
                this.modalRef = this.classePopupService
                    .open(ClasseDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
