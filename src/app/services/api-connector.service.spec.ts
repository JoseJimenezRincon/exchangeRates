import { TestBed } from '@angular/core/testing';

import { ApiConnectorService } from './api-connector.service';

describe('ApiConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiConnectorService = TestBed.get(ApiConnectorService);
    expect(service).toBeTruthy();
  });
});
