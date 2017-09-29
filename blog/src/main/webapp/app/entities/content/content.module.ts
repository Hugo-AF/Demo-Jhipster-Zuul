import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    ContentService,
    ContentPopupService,
    ContentComponent,
    ContentDetailComponent,
    ContentDialogComponent,
    ContentPopupComponent,
    ContentDeletePopupComponent,
    ContentDeleteDialogComponent,
    contentRoute,
    contentPopupRoute,
    ContentResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...contentRoute,
    ...contentPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ContentComponent,
        ContentDetailComponent,
        ContentDialogComponent,
        ContentDeleteDialogComponent,
        ContentPopupComponent,
        ContentDeletePopupComponent,
    ],
    entryComponents: [
        ContentComponent,
        ContentDialogComponent,
        ContentPopupComponent,
        ContentDeleteDialogComponent,
        ContentDeletePopupComponent,
    ],
    providers: [
        ContentService,
        ContentPopupService,
        ContentResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogContentModule {}
