import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoApiService } from '../../services/produto-api';

@Component({
  selector: 'app-lista-produtos',   // Usável como <app-lista-produtos></app-lista-produtos>
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css']
})
export class ListaProdutosComponent implements OnInit {
  
  // Propriedades observáveis no template
  produtos: any[] = [];
  carregando: boolean = false;
  
  // Injeta o serviço de API
  constructor(private api: ProdutoApiService) { }
  
  // Chamado automaticamente após o componente ser criado
  ngOnInit(): void {
    this.carregarProdutos();
  }
  
  // Busca produtos do backend
  carregarProdutos() {
    this.carregando = true;
    this.api.getProdutos().subscribe(
      dados => {
        console.log('Resposta /produtos:', dados);
        console.log('carregando iniciado:', this.carregando);
        // Normaliza formatos: aceita array direto ou objetos com campos comuns
        let arr: any[] = [];
        if (Array.isArray(dados)) {
          arr = dados;
        } else if (dados && Array.isArray((dados as any).content)) {
          arr = (dados as any).content;
        } else if (dados && Array.isArray((dados as any).data)) {
          arr = (dados as any).data;
        } else {
          arr = [];
        }

        // Normaliza campo tipoNome para compatibilidade com template que usa produto.tipo.nome
        this.produtos = arr.map(p => ({
          ...p,
          tipo: p.tipo ?? (p.tipoNome ? { nome: p.tipoNome } : undefined)
        }));
        this.carregando = false;
        console.log('carregando finalizado:', this.carregando);
      },
      erro => {
        console.error('Erro ao carregar', erro);
        this.carregando = false;
      }
    );
  }

  deletar(id: number) {
    this.api.deletarProduto(id).subscribe(
      () => this.carregarProdutos(),
      erro => console.error('Erro ao deletar', erro)
    );
  }
}