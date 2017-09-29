import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Content } from './content.model';
import { ContentPopupService } from './content-popup.service';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content-dialog',
    templateUrl: './content-dialog.component.html'
})
export class ContentDialogComponent implements OnInit {

    content: Content;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private contentService: ContentService,
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
        if (this.content.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contentService.update(this.content), false);
        } else {
            this.subscribeToSaveResponse(
                this.contentService.create(this.content), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Content>, isCreated: boolean) {
        result.subscribe((res: Content) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Content, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'blogApp.content.created'
            : 'blogApp.content.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'contentListModification', content: 'OK'});
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
    selector: 'jhi-content-popup',
    template: ''
})
export class ContentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentPopupService: ContentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.contentPopupService
                    .open(ContentDialogComponent, params['id']);
            } else {
                this.modalRef = this.contentPopupService
                    .open(ContentDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
