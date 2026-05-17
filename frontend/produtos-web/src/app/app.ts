import { Component, signal } from '@angular/core';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProdutosComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('produtos-web');
}
