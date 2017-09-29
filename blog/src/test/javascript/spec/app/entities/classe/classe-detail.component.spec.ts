import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlogTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ClasseDetailComponent } from '../../../../../../main/webapp/app/entities/classe/classe-detail.component';
import { ClasseService } from '../../../../../../main/webapp/app/entities/classe/classe.service';
import { Classe } from '../../../../../../main/webapp/app/entities/classe/classe.model';

describe('Component Tests', () => {

    describe('Classe Management Detail Component', () => {
        let comp: ClasseDetailComponent;
        let fixture: ComponentFixture<ClasseDetailComponent>;
        let service: ClasseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [ClasseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ClasseService,
                    JhiEventManager
                ]
            }).overrideTemplate(ClasseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClasseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClasseService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Classe(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.classe).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
