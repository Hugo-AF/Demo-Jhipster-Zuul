import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlogTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonnesDetailComponent } from '../../../../../../main/webapp/app/entities/personnes/personnes-detail.component';
import { PersonnesService } from '../../../../../../main/webapp/app/entities/personnes/personnes.service';
import { Personnes } from '../../../../../../main/webapp/app/entities/personnes/personnes.model';

describe('Component Tests', () => {

    describe('Personnes Management Detail Component', () => {
        let comp: PersonnesDetailComponent;
        let fixture: ComponentFixture<PersonnesDetailComponent>;
        let service: PersonnesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [PersonnesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonnesService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonnesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonnesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonnesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Personnes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.personnes).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
