import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogProductModule } from './product/product.module';
import { BlogContentModule } from './content/content.module';
import { BlogClasseModule } from './classe/classe.module';
import { BlogPersonnesModule } from './personnes/personnes.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BlogProductModule,
        BlogContentModule,
        BlogClasseModule,
        BlogPersonnesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
