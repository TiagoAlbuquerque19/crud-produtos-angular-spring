import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TipoProdutoService } from './tipo-produto';

describe('TipoProdutoService', () => {
  let service: TipoProdutoService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TipoProdutoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should use the product type API endpoints', () => {
    service.listar().subscribe();
    httpTesting.expectOne('http://localhost:8080/tipos-produto').flush([]);

    service.criar('Eletrônico').subscribe();
    httpTesting
      .expectOne({
        method: 'POST',
        url: 'http://localhost:8080/tipos-produto',
      })
      .flush({});

    service.excluir(1).subscribe();
    httpTesting
      .expectOne({
        method: 'DELETE',
        url: 'http://localhost:8080/tipos-produto/1',
      })
      .flush(null);
  });
});
