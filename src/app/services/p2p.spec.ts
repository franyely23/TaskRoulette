import { TestBed } from '@angular/core/testing';

import { P2pService } from './p2p';
import { StorageService } from 'src/app/services/storage.service';

describe('P2pService', () => {
  let service: P2pService;

  const storageServiceMock = {
    get: jasmine.createSpy().and.returnValue(Promise.resolve(null)),
    set: jasmine.createSpy().and.returnValue(Promise.resolve()),
    remove: jasmine.createSpy().and.returnValue(Promise.resolve())
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        P2pService,
        { provide: StorageService, useValue: storageServiceMock }
      ]
    });

    service = TestBed.inject(P2pService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});