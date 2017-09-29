import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlogTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ContentDetailComponent } from '../../../../../../main/webapp/app/entities/content/content-detail.component';
import { ContentService } from '../../../../../../main/webapp/app/entities/content/content.service';
import { Content } from '../../../../../../main/webapp/app/entities/content/content.model';

describe('Component Tests', () => {

    describe('Content Management Detail Component', () => {
        let comp: ContentDetailComponent;
        let fixture: ComponentFixture<ContentDetailComponent>;
        let service: ContentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [ContentDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ContentService,
                    JhiEventManager
                ]
            }).overrideTemplate(ContentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Content(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.content).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
