import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonnesComponent } from './personnes.component';
import { PersonnesDetailComponent } from './personnes-detail.component';
import { PersonnesPopupComponent } from './personnes-dialog.component';
import { PersonnesDeletePopupComponent } from './personnes-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class PersonnesResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const personnesRoute: Routes = [
    {
        path: 'personnes',
        component: PersonnesComponent,
        resolve: {
            'pagingParams': PersonnesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.personnes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'personnes/:id',
        component: PersonnesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.personnes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personnesPopupRoute: Routes = [
    {
        path: 'personnes-new',
        component: PersonnesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.personnes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personnes/:id/edit',
        component: PersonnesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.personnes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'personnes/:id/delete',
        component: PersonnesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.personnes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
