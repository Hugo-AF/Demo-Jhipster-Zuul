import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ClasseComponent } from './classe.component';
import { ClasseDetailComponent } from './classe-detail.component';
import { ClassePopupComponent } from './classe-dialog.component';
import { ClasseDeletePopupComponent } from './classe-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ClasseResolvePagingParams implements Resolve<any> {

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

export const classeRoute: Routes = [
    {
        path: 'classe',
        component: ClasseComponent,
        resolve: {
            'pagingParams': ClasseResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'classe/:id',
        component: ClasseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classePopupRoute: Routes = [
    {
        path: 'classe-new',
        component: ClassePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classe/:id/edit',
        component: ClassePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classe/:id/delete',
        component: ClasseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
