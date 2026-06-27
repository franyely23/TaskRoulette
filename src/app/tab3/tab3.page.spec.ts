import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3Page } from './tab3.page';
import { StorageService } from 'src/app/services/storage.service';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  const storageServiceMock = {
    get: jasmine.createSpy().and.returnValue(Promise.resolve(null)),
    set: jasmine.createSpy().and.returnValue(Promise.resolve()),
    remove: jasmine.createSpy().and.returnValue(Promise.resolve())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [
        IonicModule.forRoot(),
        ExploreContainerComponentModule
      ],
      providers: [
        { provide: StorageService, useValue: storageServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});