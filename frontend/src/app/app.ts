import { Component } from '@angular/core';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProdutosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
