import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    PersonnesService,
    PersonnesPopupService,
    PersonnesComponent,
    PersonnesDetailComponent,
    PersonnesDialogComponent,
    PersonnesPopupComponent,
    PersonnesDeletePopupComponent,
    PersonnesDeleteDialogComponent,
    personnesRoute,
    personnesPopupRoute,
    PersonnesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...personnesRoute,
    ...personnesPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonnesComponent,
        PersonnesDetailComponent,
        PersonnesDialogComponent,
        PersonnesDeleteDialogComponent,
        PersonnesPopupComponent,
        PersonnesDeletePopupComponent,
    ],
    entryComponents: [
        PersonnesComponent,
        PersonnesDialogComponent,
        PersonnesPopupComponent,
        PersonnesDeleteDialogComponent,
        PersonnesDeletePopupComponent,
    ],
    providers: [
        PersonnesService,
        PersonnesPopupService,
        PersonnesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogPersonnesModule {}
