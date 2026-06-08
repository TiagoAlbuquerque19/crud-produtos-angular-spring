import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TipoProduto {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class TipoProdutoService {
  private readonly api = 'http://localhost:8080/tipos-produto';

  constructor(private http: HttpClient) {}

  listar(): Observable<TipoProduto[]> {
    return this.http.get<TipoProduto[]>(this.api);
  }

  criar(nome: string): Observable<TipoProduto> {
    return this.http.post<TipoProduto>(this.api, { nome });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
