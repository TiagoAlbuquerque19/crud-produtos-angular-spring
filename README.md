# Relatório — Migração de Aplicação Console para Web

**Disciplina:** Desenvolvimento de Software  
**Projeto:** CRUD de Produtos com Spring Boot e Angular  
**Repositório:** https://github.com/TiagoAlbuquerque19/crud-produtos-angular-spring

---

## 1. Padrões de Projeto Aplicados

### MVC (Model-View-Controller)
O padrão MVC organiza o sistema em três camadas com responsabilidades distintas. No backend, os **Controllers** (`ProdutoController`, `TipoProdutoController`) recebem as requisições HTTP e delegam o processamento para os Services, sem conter lógica de negócio. No frontend Angular, os **componentes** representam a View, enquanto os **services** fazem o papel de intermediários entre a tela e a API.

Exemplo no código:
```java
// ProdutoController.java — apenas recebe a requisição e delega ao Service
@PostMapping
public ResponseEntity<ProdutoResponse> criar(@Valid @RequestBody ProdutoRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(request));
}
```

### Repository Pattern
O padrão Repository abstrai o acesso ao banco de dados, isolando a lógica de persistência do restante da aplicação. As interfaces `ProdutoRepository` e `TipoProdutoRepository` estendem `JpaRepository`, o que fornece automaticamente as operações de CRUD sem necessidade de implementação manual.

```java
public interface ProdutoRepository extends JpaRepository<Produto, Long> {}
```

### Service Layer
Toda a lógica de negócio está concentrada nos Services (`ProdutoService`, `TipoProdutoService`). Isso garante que os Controllers permaneçam finos e que as regras possam ser reutilizadas e testadas de forma isolada.

Exemplo:
```java
// ProdutoService.java — valida e monta o objeto antes de salvar
public ProdutoResponse criar(ProdutoRequest request) {
    TipoProduto tipo = tipoProdutoRepository.findById(request.getTipoId())
        .orElseThrow(() -> new RuntimeException("Tipo não encontrado"));
    Produto produto = new Produto(request.getNome(), request.getPreco(), tipo);
    Produto salvo = produtoRepository.save(produto);
    return new ProdutoResponse(salvo.getId(), salvo.getNome(), salvo.getPreco(), salvo.getTipo().getNome());
}
```

### DTO (Data Transfer Object)
Os DTOs (`ProdutoRequest`, `ProdutoResponse`, `TipoProdutoRequest`) desacoplam as entidades JPA da API REST. Isso protege o modelo de domínio de exposição direta e permite controlar exatamente quais dados entram e saem da API. As anotações de validação (`@NotBlank`, `@NotNull`, `@Positive`) também ficam nos DTOs, mantendo as entidades limpas.

### Observer (RxJS — Angular)
No frontend, o padrão Observer é aplicado por meio do RxJS. Os métodos dos services retornam `Observable`, e os componentes se inscrevem (`.subscribe()`) para reagir aos dados quando chegam de forma assíncrona.

```typescript
this.produtoService.listar().subscribe({
  next: (dados) => (this.produtos = dados),
  error: () => this.exibirErro('Não foi possível carregar os produtos.')
});
```

### Padrões GRASP (versão console original)

A aplicação console que deu origem a este projeto foi estruturada seguindo os padrões GRASP, distribuindo responsabilidades entre os pacotes da seguinte forma:

| Pacote            | Classe                                               | Papel GRASP                                                 |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| `feira.graspcrud` | `Main`                                               | Bootstrap / Criador das dependencias                        |
| `controller`      | `ProdutoController`                                  | **Controller** — recebe entrada do usuario e delega         |
| `domain`          | `Produto`, `TipoProduto`                             | **Information Expert** — validam suas proprias regras       |
| `dto`             | `ProdutoRequest`, `TipoProdutoRequest`               | Objetos de transferencia de dados (entrada)                 |
| `exception`       | `RegraNegocioException`                              | Excecao de dominio                                          |
| `repository`      | `ProdutoRepository`, `TipoProdutoRepository`         | **Protected Variations** — interfaces de persistencia       |
| `repository.json` | `ProdutoRepositoryJson`, `TipoProdutoRepositoryJson` | **Pure Fabrication** + **Indirection** — implementacao JSON |
| `service`         | `ProdutoService`, `TipoProdutoService`               | Casos de uso — **Low Coupling** via interfaces              |

---

## 2. Principal Mudança ao Migrar de Console para Web

A maior mudança foi a natureza da comunicação. Na aplicação console, o programa lia entradas do usuário de forma sequencial e síncrona. Na aplicação web, o backend expõe uma API REST que responde a requisições HTTP independentes, sem estado entre elas. O frontend Angular, por sua vez, consome essa API de forma assíncrona, reagindo aos dados por meio de Observables.

Além disso, foi necessário implementar tratamento de erros padronizado via `GlobalExceptionHandler`, separação em DTOs para não expor as entidades diretamente, e configuração de CORS para permitir a comunicação entre origens diferentes (`localhost:4200` → `localhost:8080`).

---

## 3. Principais Dificuldades

- **Banco de dados em memória:** A configuração padrão do H2 (`mem:`) fazia com que os dados fossem perdidos a cada reinicialização do backend. A solução foi trocar para banco em arquivo (`jdbc:h2:file:./produtosdb`).
- **Zone.js no Angular:** O projeto Angular gerado não importava o `zone.js` no `main.ts`, causando erro de inicialização. A correção foi adicionar `import 'zone.js'` no topo do arquivo.
- **CORS:** Sem a configuração de CORS no backend, o navegador bloqueava as requisições do Angular. Foi criada a classe `CorsConfig` liberando a origem `http://localhost:4200`.

---

## 4. Melhorias Futuras

- **Autenticação:** Implementar autenticação com Spring Security e JWT para proteger os endpoints da API.
- **Banco de dados de produção:** Substituir o H2 por PostgreSQL ou MySQL para uso em ambiente real.
- **Paginação:** Adicionar paginação na listagem de produtos para suportar grandes volumes de dados.
- **Edição de registros:** Implementar operação de atualização (PUT) para produtos e tipos de produto.
- **Testes automatizados:** Criar testes unitários nos Services com JUnit e testes de integração nos Controllers com MockMvc.
