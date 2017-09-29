import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Classe } from './classe.model';
import { ClassePopupService } from './classe-popup.service';
import { ClasseService } from './classe.service';

@Component({
    selector: 'jhi-classe-delete-dialog',
    templateUrl: './classe-delete-dialog.component.html'
})
export class ClasseDeleteDialogComponent {

    classe: Classe;

    constructor(
        private classeService: ClasseService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'classeListModification',
                content: 'Deleted an classe'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('blogApp.classe.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-classe-delete-popup',
    template: ''
})
export class ClasseDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classePopupService: ClassePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.classePopupService
                .open(ClasseDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
