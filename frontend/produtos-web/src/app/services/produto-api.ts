import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Torna serviço singleton (uma instância global)
})
export class ProdutoApiService {
  
  private apiUrl = 'http://localhost:8080';  // URL do backend Spring Boot
  
  constructor(private http: HttpClient) { }  // Injeta HttpClient do Angular
  
  // GET: recupera todos os produtos
  // Observable: fluxo assíncrono de dados
  getProdutos(): Observable<any> {
    const url = `${this.apiUrl}/produtos`;
    console.log('Chamando API GET', url);
    return this.http.get(url).pipe(
      tap(res => console.log('Resposta API /produtos ->', res))
    );
  }
  
  // POST: cria um novo produto
  criarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/produtos`, produto);
  }
  
  // DELETE: remove um produto
  deletarProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produtos/${id}`);
  }
  
  // GET: recupera todos os tipos
  getTipos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipos`);
  }
}