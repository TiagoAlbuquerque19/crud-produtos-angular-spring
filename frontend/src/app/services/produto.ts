import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  tipoNome: string;
}

export interface ProdutoRequest {
  nome: string;
  preco: number;
  tipoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly api = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }

  criar(produto: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.api, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
