import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
})
export class ListaProdutosComponent implements OnInit {
  produtos: any[] = [];

  constructor(private service: ProdutoService) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (dados: any) => {
        console.log(dados);
        this.produtos = dados;
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }
}
