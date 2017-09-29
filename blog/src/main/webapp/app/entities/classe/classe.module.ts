import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    ClasseService,
    ClassePopupService,
    ClasseComponent,
    ClasseDetailComponent,
    ClasseDialogComponent,
    ClassePopupComponent,
    ClasseDeletePopupComponent,
    ClasseDeleteDialogComponent,
    classeRoute,
    classePopupRoute,
    ClasseResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...classeRoute,
    ...classePopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ClasseComponent,
        ClasseDetailComponent,
        ClasseDialogComponent,
        ClasseDeleteDialogComponent,
        ClassePopupComponent,
        ClasseDeletePopupComponent,
    ],
    entryComponents: [
        ClasseComponent,
        ClasseDialogComponent,
        ClassePopupComponent,
        ClasseDeleteDialogComponent,
        ClasseDeletePopupComponent,
    ],
    providers: [
        ClasseService,
        ClassePopupService,
        ClasseResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogClasseModule {}
