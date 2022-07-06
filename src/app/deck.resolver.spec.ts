import { TestBed } from '@angular/core/testing';

import { DeckResolver } from './deck.resolver';

describe('DeckResolver', () => {
  let resolver: DeckResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DeckResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
