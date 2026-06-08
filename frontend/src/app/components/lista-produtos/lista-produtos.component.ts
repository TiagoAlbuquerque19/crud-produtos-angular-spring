import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoRequest, ProdutoService } from '../../services/produto';
import { TipoProduto, TipoProdutoService } from '../../services/tipo-produto';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  tipos: TipoProduto[] = [];
  novoTipoNome = '';
  novoProduto: ProdutoRequest = {
    nome: '',
    preco: 0,
    tipoId: 0,
  };
  mensagem = '';
  erro = '';

  constructor(
    private produtoService: ProdutoService,
    private tipoProdutoService: TipoProdutoService,
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregarProdutos();
    this.carregarTipos();
  }

  criarTipo(): void {
    const nome = this.novoTipoNome.trim();
    if (!nome) {
      this.exibirErro('Informe o nome do tipo.');
      return;
    }

    this.tipoProdutoService.criar(nome).subscribe({
      next: () => {
        this.novoTipoNome = '';
        this.exibirMensagem('Tipo cadastrado com sucesso.');
        this.carregarTipos();
      },
      error: () => this.exibirErro('Não foi possível cadastrar o tipo.'),
    });
  }

  excluirTipo(id: number): void {
    this.tipoProdutoService.excluir(id).subscribe({
      next: () => {
        this.exibirMensagem('Tipo excluído com sucesso.');
        this.carregarTipos();
      },
      error: () => this.exibirErro('Não foi possível excluir o tipo.'),
    });
  }

  criarProduto(): void {
    if (
      !this.novoProduto.nome.trim() ||
      this.novoProduto.preco <= 0 ||
      !this.novoProduto.tipoId
    ) {
      this.exibirErro('Preencha nome, preço e tipo do produto.');
      return;
    }

    this.produtoService.criar(this.novoProduto).subscribe({
      next: () => {
        this.novoProduto = { nome: '', preco: 0, tipoId: 0 };
        this.exibirMensagem('Produto cadastrado com sucesso.');
        this.carregarProdutos();
      },
      error: () => this.exibirErro('Não foi possível cadastrar o produto.'),
    });
  }

  excluirProduto(id: number): void {
    this.produtoService.excluir(id).subscribe({
      next: () => {
        this.exibirMensagem('Produto excluído com sucesso.');
        this.carregarProdutos();
      },
      error: () => this.exibirErro('Não foi possível excluir o produto.'),
    });
  }

  private carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => (this.produtos = dados),
      error: () => this.exibirErro('Não foi possível carregar os produtos.'),
    });
  }

  private carregarTipos(): void {
    this.tipoProdutoService.listar().subscribe({
      next: (dados) => (this.tipos = dados),
      error: () => this.exibirErro('Não foi possível carregar os tipos de produto.'),
    });
  }

  private exibirMensagem(mensagem: string): void {
    this.mensagem = mensagem;
    this.erro = '';
  }

  private exibirErro(erro: string): void {
    this.erro = erro;
    this.mensagem = '';
  }
}
