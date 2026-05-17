# Roteiro de Laboratorio - 8 Aulas Leves com Detalhes Tecnologicos

## Como usar este roteiro

- Formato: 8 aulas de 90 minutos cada.
- Ritmo: leve, com mais tempo para explicacoes de conceito.
- Perfil: alunos sem experiencia com Spring ou Angular.
- Foco: instalar, entender, depois praticar.

---

## Aula 1 (90 min) - Introducao + Preparacao de Ambiente

### Parte 1: Conceitos Fundamentais (30 min)

#### O que e uma API REST?

API (Application Programming Interface) = conjunto de regras para programas se comunicarem.

REST (Representational State Transfer) = padrao para apis web baseado em HTTP.

Diferenca console x web:

- Console: usuario interage via teclado e terminal.
- Web: usuario interage via navegador.
- API: computador interage com outro computador via HTTP.

Exemplos reais:

- Google, Instagram, Spotify = todas tem APIs que frontend consome.
- Backend fornece dados em JSON.
- Frontend exibe ao usuario.

#### O que e Spring Boot?

Framework Java = conjunto de codigos prontos para nao reinventar roda.

Spring Boot = simplifica criacao de aplicacoes web em Java.

Beneficios:

- Menos configuracao manual.
- Comunidade grande.
- Produzido por Pivotal (empresa respeitada).

#### Qual e a diferenca entre Spring e Spring Boot?

Spring e o ecossistema original de bibliotecas Java para construir aplicacoes corporativas.

Spring Boot e uma camada por cima do Spring que facilita o uso do framework.

- Spring: voce monta a aplicacao, configura beans, servidor e dependencias.
- Spring Boot: ele faz a configuracao automaticamente, fornece starters e roda com servidor embutido.
- Spring Boot usa Spring internamente; ele nao substitui o Spring, apenas reduz o trabalho de configuracao.

Exemplo:

- Com Spring puro, voce precisa configurar manualmente o servidor, o datasource e os componentes.
- Com Spring Boot, basta colocar `@SpringBootApplication`, escolher as dependencias e rodar `mvn spring-boot:run`.

#### O que e Angular?

Framework TypeScript para criar interfaces web.

> **Neste projeto usamos Angular 21.2** — a versao mais moderna do framework no momento da disciplina.

Alternativas: React, Vue (mas aqui usamos Angular).

Por que Angular?

- Digitado (TypeScript, menos erros).
- Padronizado (bom para ensino).
- Ferramenta CLI poderosa.
- Angular 21 gera componentes standalone por padrao: sem NgModule, estrutura mais simples.

#### O que e Maven?

Apache Maven = gerenciador de dependencias e build para Java.

Build = processo de compilar, testar e empacotar codigo.

Problema sem Maven:

- Baixar manualmente cada biblioteca (jar).
- Adicionar no projeto manualmente.
- Descobrir incompatibilidades entre versoes.
- Muito trabalhoso.

Solucao com Maven:

- Arquivo pom.xml lista dependencias desejadas.
- Maven baixa automaticamente.
- Maven cuida de compatibilidade de versoes.
- Maven compila, testa, cria executavel.

Exemplo pom.xml:

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>3.2.0</version>
  </dependency>
</dependencies>
```

Maven vai:

1. Baixar spring-boot-starter-web versao 3.2.0.
2. Baixar todas as dependencias desse projeto.
3. Colocar tudo em uma pasta (target).
4. Disponibilizar para compilacao.

Comandos Maven comuns:

```bash
mvn clean         # limpa pasta target
mvn compile       # compila codigo
mvn test          # roda testes
mvn package       # empacota .jar
mvn spring-boot:run # executa aplicacao
```

Ciclo de vida Maven:

clean → validate → compile → test → package → install → deploy

Cada fase executa as anteriores.

---

### Parte 2: Instalacao e Verificacao (60 min)

#### 00-15 min: Instalar Java

Baixar Java 17 ou 21 (versao LTS).

Link: https://www.oracle.com/java/technologies/downloads/

Passos:

1. Fazer download para Windows x64 (exe ou zip).
2. Executar instalador e seguir passos padrao.
3. No final, Java estara em: C:\Program Files\Java\jdk-17 (ou similar).

Verificar instalacao:

Abrir PowerShell e digitar:

java -version

Resposta esperada:

java version "17.0.x" (ou superior)

Se nao funcionar:

- Reiniciar PowerShell.
- Ou adicionar Java ao PATH manualmente (avancado).

#### 15-30 min: Instalar Maven

Apache Maven = gerenciador de dependencias e build para Java.

Link: https://maven.apache.org/download.cgi

Passos:

1. Baixar versao .zip (nao precisa instalador).
2. Descompactar em C:\Program Files\maven (criar pasta).
3. Adicionar Maven ao PATH:
   - Painel de Controle > Variaveis de Ambiente.
   - Editar "Path" do sistema.
   - Adicionar: C:\Program Files\maven\bin

Verificar instalacao:

No PowerShell:

mvn -version

Resposta esperada:

Apache Maven 3.8.x (ou superior)

#### 30-45 min: Instalar Node.js e Angular CLI

Node.js = ambiente JavaScript fora do navegador.
npm = gerenciador de pacotes JavaScript (vem com Node).
Angular CLI = ferramenta para gerar projetos Angular.

Link Node: https://nodejs.org (usar versao LTS)

Passos:

1. Baixar instalador LTS para Windows.
2. Executar e seguir passos (proximo, proximo...).
3. Ao final, node e npm estarao no PATH automaticamente.

Instalar Angular CLI:

Abrir PowerShell (pode ser qualquer pasta) e digitar:

npm install -g @angular/cli

(g = global, fica disponivel em qualquer pasta)

Verificar instalacao:

node -v
npm -v
ng version

Resposta esperada:

Numeros de versao para cada comando.

#### 45-60 min: Verificacao final de todas as ferramentas

Criar um arquivo de teste chamado verificar_ambiente.ps1 com:

```powershell
Write-Host "Java:"
java -version
Write-Host "Maven:"
mvn -version
Write-Host "Node:"
node -v
npm -v
Write-Host "Angular CLI:"
ng version
```

Executar:

powershell .\verificar_ambiente.ps1

Checkpoint:

Todos os comandos retornam versao.

#### 60-75 min: Instalar Git (opcional, mas recomendado)

Link: https://git-scm.com/download/win

Passos:

1. Executar instalador.
2. Usar opcoes padrao (próximo, próximo...).

Verificar:

git --version

#### 75-90 min: Organizar estrutura do trabalho

No PowerShell, ir para a pasta do repositorio:

cd C:\Users\SeuUsuario\Documents\Ensino\Unifor\github\gabarito-crud-grasp-produto

Criar pastas:

New-Item -ItemType Directory -Force backend
New-Item -ItemType Directory -Force frontend

Checkpoint:

Estrutura pronta para comeco do desenvolvimento.

---

## Aula 2 (90 min) - Conceitos de Arquitetura Web + Bootstrap Spring

### Parte 1: Arquitetura em Camadas (30 min)

#### O que sao camadas?

Camadas = niveis de responsabilidade separados.

Exemplo:

- Controller: recebe requisicao HTTP
- Service: executa regra de negocio
- Repository: acessa banco de dados
- Domain: representa conceito do negocio

Por que separar?

- Cada coisa em seu lugar.
- Facil de testar.
- Facil de manter.
- Facil de trocar banco de dados depois.

#### MVC vs Clean Architecture

MVC (Model, View, Controller) = basico, compreensivel.

- Model = entidade (Produto)
- View = interface (nao existe em API REST, mas e conceptual)
- Controller = recebe requisicao, coordena

Clean Architecture = MVC com mais camadas (avancado, nao usamos aqui).

#### DTO - Transferencia de Dados

DTO (Data Transfer Object) = objeto so para trafecar informacao na rede.

Por que?

- Entidade JPA tem logica do banco (@Entity, @Column, etc).
- Cliente nao precisa ver isso.
- DTO e mais simples, sem anotacoes de banco.

Exemplo:

Entidade:

```java
@Entity
class Produto {
  @Id long id;
  @Column String nome;
}
```

DTO Request (o que cliente envia):

```java
class ProdutoRequest {
  String nome;
  double preco;
}
```

DTO Response (o que API retorna):

```java
class ProdutoResponse {
  long id;
  String nome;
  double preco;
}
```

### Parte 2: Criar projeto Spring Boot (60 min)

#### 00-15 min: Acessar Spring Initializr

Abrir navegador: https://start.spring.io

Tela visivel:

- Project: Maven Project (deixar padrao)
- Language: Java (deixar padrao)
- Spring Boot: versao mais recente (ex: 3.2.x)

#### 15-30 min: Preencher formulario

Group: br.unifor
Artifact: produtos-api
Name: Produtos API
Description: API REST de Produtos (tera preenchimento automatico)
Package name: br.unifor.produtosapi (preenchimento automatico)
Packaging: Jar (deixar padrao)
Java: 17 ou 21

#### 30-45 min: Selecionar dependencias

No campo "Add Dependencies", procurar e adicionar:

1. Spring Web (para criar API REST)
2. Spring Data JPA (para persistencia em banco)
3. Validation (para validar dados entrados)
4. H2 Database (banco de dados leve em memoria)

Visually:

Clicar no campo "Add Dependencies" e digitar cada nome, entao clicar para adicionar.

#### 45-60 min: Gerar e descompactar

1. Clicar em "Generate" (download comeca).
2. Arquivo baixado: produtos-api.zip
3. Descompactar na pasta backend criada.
4. Estrutura: backend/produtos-api/

#### 60-75 min: Primeiro teste de execucao

Abrir PowerShell:

cd backend\produtos-api
mvn clean
mvn spring-boot:run

Saida esperada:

```
...
Started ProdutosApiApplication in X.xxx seconds (JVM running for Y.yyy)
```

Se parar em timeout ou erro, apertar Ctrl+C e tentar novamente.

#### 75-90 min: Explorar estrutura do projeto criado

Abrir VS Code na pasta backend/produtos-api:

code .

Explicar:

- pom.xml = arquivo de dependencias Maven
- src/main/java = codigo Java
- src/main/resources = arquivos de configuracao
- target = pasta com bytecode compilado (ignorar)

Checkpoint:

Projeto sobe sem erros e estrutura de pastas e clara.

---

## Aula 3 (90 min) - JPA, Entidades e Banco de Dados

### Parte 1: Conceitos de ORM e JPA (30 min)

#### O que e ORM?

ORM (Object-Relational Mapping) = converte objeto Java em linhas de banco.

Antes (sem ORM):

```java
// Escrever SQL manualmente
String sql = "SELECT * FROM produto WHERE id = 1";
```

Depois (com ORM/JPA):

```java
// Java e ORM convertem automaticamente
Produto p = repository.findById(1);
```

#### O que e JPA?

JPA (Java Persistence API) = padrao Java para persistencia.

Hibernate = implementacao JPA mais popular (inclusa no Spring Boot).

Anotacoes importantes:

- @Entity = marca classe como entidade (mapa para tabela)
- @Id = marca campo como chave primaria
- @GeneratedValue = incrementa automaticamente
- @Column = configura detalhes da coluna
- @ManyToOne = relacionamento varios para um

#### Exemplo: TipoProduto

TipoProduto tem: id, nome.

```java
@Entity
public class TipoProduto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  // getters, setters, construtores
}
```

Tabela no banco:

| id | nome       |
| -- | ---------- |
| 1  | Eletronico |
| 2  | Alimento   |

#### Exemplo: Produto

Produto tem: id, nome, preco, tipo (relacionamento).

```java
@Entity
public class Produto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  @Column(nullable = false)
  private Double preco;

  @ManyToOne
  @JoinColumn(name = "tipo_id")
  private TipoProduto tipo;

  // getters, setters, construtores
}
```

Tabela no banco:

| id | nome     | preco | tipo_id |
| -- | -------- | ----- | ------- |
| 1  | Notebook | 3000  | 1       |
| 2  | Maçã   | 5     | 2       |

### Parte 2: Criar entidades no projeto (60 min)

#### 00-15 min: Criar pacote domain

Em src/main/java/br/unifor/produtosapi, criar pasta: domain

#### 15-30 min: Criar classe TipoProduto

Arquivo: src/main/java/br/unifor/produtosapi/domain/TipoProduto.java

```java
package br.unifor.produtosapi.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_produto")
public class TipoProduto {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @Column(nullable = false, length = 100)
    private String nome;
  
    public TipoProduto() {}
  
    public TipoProduto(String nome) {
        this.nome = nome;
    }
  
    // Getters e setters
    public Long getId() {
        return id;
    }
  
    public void setId(Long id) {
        this.id = id;
    }
  
    public String getNome() {
        return nome;
    }
  
    public void setNome(String nome) {
        this.nome = nome;
    }
}
```

#### 30-45 min: Criar classe Produto

Arquivo: src/main/java/br/unifor/produtosapi/domain/Produto.java

```java
package br.unifor.produtosapi.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "produto")
public class Produto {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @Column(nullable = false, length = 150)
    private String nome;
  
    @Column(nullable = false)
    private Double preco;
  
    @ManyToOne
    @JoinColumn(name = "tipo_id", nullable = false)
    private TipoProduto tipo;
  
    public Produto() {}
  
    public Produto(String nome, Double preco, TipoProduto tipo) {
        this.nome = nome;
        this.preco = preco;
        this.tipo = tipo;
    }
  
    // Getters e setters
    public Long getId() {
        return id;
    }
  
    public void setId(Long id) {
        this.id = id;
    }
  
    public String getNome() {
        return nome;
    }
  
    public void setNome(String nome) {
        this.nome = nome;
    }
  
    public Double getPreco() {
        return preco;
    }
  
    public void setPreco(Double preco) {
        this.preco = preco;
    }
  
    public TipoProduto getTipo() {
        return tipo;
    }
  
    public void setTipo(TipoProduto tipo) {
        this.tipo = tipo;
    }
}
```

#### 45-60 min: Criar repositories

Arquivo: src/main/java/br/unifor/produtosapi/repository/TipoProdutoRepository.java

```java
package br.unifor.produtosapi.repository;

import br.unifor.produtosapi.domain.TipoProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoProdutoRepository extends JpaRepository<TipoProduto, Long> {
}
```

Arquivo: src/main/java/br/unifor/produtosapi/repository/ProdutoRepository.java

```java
package br.unifor.produtosapi.repository;

import br.unifor.produtosapi.domain.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
```

#### 60-75 min: Configurar H2 no application.properties

Arquivo: src/main/resources/application.properties

```properties
# H2 Database
spring.datasource.url=jdbc:h2:mem:produtosdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Console H2
spring.h2.console.enabled=true
```

#### 75-90 min: Testar execucao

Voltar a rodar:

```
mvn clean
mvn spring-boot:run
```

Acessar: http://localhost:8080/h2-console

Login padrao aparecera automaticamente.

Checkpoint:

- Aplicacao sobe.
- H2 console acessivel.
- Tabelas criadas automaticamente.

---

## Aula 4 (90 min) - Services, DTOs e Validacoes

### Parte 1: Conceitos de Service e DTO (30 min)

#### Por que usar Service?

Regra de negocio nao deve ficar no controller.

Controller = recebe/responde HTTP.
Service = executa logica.
Repository = acessa banco.

Exemplo regra de negocio:

- Preco deve ser maior que zero.
- Nome nao pode ser vazio.
- Produto deve ter tipo valido.

Essas regras ficam em Service, nao em Controller.

#### O que é DTO?

DTO (Data Transfer Object) = objeto simples usado para transportar dados entre camadas ou pela rede (requisicao/resposta).

Caracteristicas:

- Contém apenas campos (propriedades) e getters/setters.
- Sem lógica de negócio, sem anotações de banco de dados.
- Usado para serialização/desserialização JSON.
- Desacopla a entidade interna da API.

Por que usar?

- Entidade JPA tem anotações de persistência que o cliente não precisa conhecer.
- DTO oferece um contrato claro entre client e servidor.
- Mudanças no banco não expõem o modelo interno da API.
- Validações podem ser específicas para entrada/saída.

Dois tipos comuns:

1. **Request DTO:** dados que o cliente envia (ex.: `ProdutoRequest`)
2. **Response DTO:** dados que a API retorna (ex.: `ProdutoResponse`)

#### O papel do DTO

Entidade Produto vem do banco com dados internos (@Entity, @JoinColumn).

Usuario nao precisa dessa informacao interna.

DTO simplifica:

```java
// Entidade (banco sabe disso)
Produto {
  id, nome, preco, tipo_id
}

// DTO Response (usuario vai receber)
ProdutoResponse {
  id, nome, preco, tipoNome
}
```

#### O que são Anotações (Annotations)?

Anotacoes = marcadores no código que dizem ao compilador/framework o que fazer com a classe/método/campo.

Sintaxe: começam com `@`.

Exemplos:

```java
@Entity           // Marca classe como entidade JPA
@Service          // Marca classe como servico Spring
@GetMapping       // Marca método para responder GET HTTP
@Autowired        // Injeta dependência automaticamente
private ProdutoRepository repo;
```

Funcionamento:

1. Framework lê a anotação.
2. Executa lógica associada (ex.: criar tabela, injetar bean, rotear requisição).
3. Código fica mais limpo (sem configuração manual).

#### Principais Anotações do Spring

**Estrutura (definem componentes):**

- `@Component` = classe é um bean Spring (genérica)
- `@Service` = bean que executa lógica de negócio
- `@Repository` = bean que acessa dados
- `@Controller` = bean que lida com requisições web
- `@RestController` = @Controller + retorna JSON automaticamente

**Injeção de Dependência:**

- `@Autowired` = injeta bean automaticamente (Spring encontra tipo compatível)
- `@Qualifier("nomeDoBean")` = especifica qual bean injetar se houver vários

**Mapeamento Web:**

- `@RequestMapping("/caminho")` = define rota base
- `@GetMapping("/")` = respond GET
- `@PostMapping("/")` = responde POST
- `@DeleteMapping("/{id}")` = responde DELETE

**Parâmetros de Requisição:**

- `@PathVariable("id")` = captura {id} da URL
- `@RequestBody` = deserializa JSON em objeto
- `@RequestParam("nome")` = captura parâmetro query (ex: ?nome=João)

**JPA (Persistência):**

- `@Entity` = marca classe como tabela no banco
- `@Id` = marca campo como chave primária
- `@GeneratedValue` = auto-incremento
- `@Column` = configura coluna (nullable, length, etc)
- `@ManyToOne`, `@OneToMany` = relacionamentos
- `@JoinColumn` = especifica coluna estrangeira

#### Bean Validation (Validações de Dados)

Anotacoes para validar dados em DTOs/entidades:

- @NotNull = nao pode ser null
- @NotBlank = nao pode estar vazio (String)
- @NotEmpty = nao pode estar vazio (coleção/String)
- @Positive = deve ser > 0
- @Negative = deve ser < 0
- @Max(100) = máximo 100
- @Min(0) = mínimo 0
- @Size(min=3, max=50) = tamanho da String/coleção
- @Email = valida formato de email
- @Pattern(regexp="...") = valida por expressão regular

### Parte 2: Implementar Service e DTO (60 min)

#### 00-15 min: Criar DTO de request para Produto

Arquivo: src/main/java/br/unifor/produtosapi/dto/ProdutoRequest.java

```java
package br.unifor.produtosapi.dto;

import jakarta.validation.constraints.*;

public class ProdutoRequest {
  
    @NotBlank(message = "Nome nao pode estar vazio")
    private String nome;
  
    @NotNull(message = "Preco nao pode ser nulo")
    @Positive(message = "Preco deve ser maior que zero")
    private Double preco;
  
    @NotNull(message = "Tipo nao pode ser nulo")
    private Long tipoId;
  
    // Getters e setters
    public String getNome() {
        return nome;
    }
  
    public void setNome(String nome) {
        this.nome = nome;
    }
  
    public Double getPreco() {
        return preco;
    }
  
    public void setPreco(Double preco) {
        this.preco = preco;
    }
  
    public Long getTipoId() {
        return tipoId;
    }
  
    public void setTipoId(Long tipoId) {
        this.tipoId = tipoId;
    }
}
```

#### 15-30 min: Criar DTO de response para Produto

Arquivo: src/main/java/br/unifor/produtosapi/dto/ProdutoResponse.java

```java
package br.unifor.produtosapi.dto;

public class ProdutoResponse {
  
    private Long id;
    private String nome;
    private Double preco;
    private String tipoNome;
  
    public ProdutoResponse(Long id, String nome, Double preco, String tipoNome) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.tipoNome = tipoNome;
    }
  
    // Getters
    public Long getId() {
        return id;
    }
  
    public String getNome() {
        return nome;
    }
  
    public Double getPreco() {
        return preco;
    }
  
    public String getTipoNome() {
        return tipoNome;
    }
}
```

#### 30-45 min: Criar service de Produto

Arquivo: src/main/java/br/unifor/produtosapi/service/ProdutoService.java

```java
package br.unifor.produtosapi.service;

import br.unifor.produtosapi.domain.Produto;
import br.unifor.produtosapi.domain.TipoProduto;
import br.unifor.produtosapi.dto.ProdutoRequest;
import br.unifor.produtosapi.dto.ProdutoResponse;
import br.unifor.produtosapi.repository.ProdutoRepository;
import br.unifor.produtosapi.repository.TipoProdutoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {
  
    private final ProdutoRepository produtoRepository;
    private final TipoProdutoRepository tipoProdutoRepository;
  
    public ProdutoService(ProdutoRepository produtoRepository,
                          TipoProdutoRepository tipoProdutoRepository) {
        this.produtoRepository = produtoRepository;
        this.tipoProdutoRepository = tipoProdutoRepository;
    }
  
    public List<ProdutoResponse> listar() {
        return produtoRepository.findAll().stream()
            .map(p -> new ProdutoResponse(
                p.getId(),
                p.getNome(),
                p.getPreco(),
                p.getTipo().getNome()
            ))
            .collect(Collectors.toList());
    }
  
    public ProdutoResponse criar(ProdutoRequest request) {
        TipoProduto tipo = tipoProdutoRepository.findById(request.getTipoId())
            .orElseThrow(() -> new RuntimeException("Tipo nao encontrado"));
  
        Produto produto = new Produto(request.getNome(), request.getPreco(), tipo);
        Produto salvo = produtoRepository.save(produto);
  
        return new ProdutoResponse(salvo.getId(), salvo.getNome(), 
            salvo.getPreco(), salvo.getTipo().getNome());
    }
  
    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }
}
```

#### 45-60 min: Criar service de TipoProduto

Arquivo: src/main/java/br/unifor/produtosapi/service/TipoProdutoService.java

```java
package br.unifor.produtosapi.service;

import br.unifor.produtosapi.domain.TipoProduto;
import br.unifor.produtosapi.repository.TipoProdutoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TipoProdutoService {
  
    private final TipoProdutoRepository repository;
  
    public TipoProdutoService(TipoProdutoRepository repository) {
        this.repository = repository;
    }
  
    public List<TipoProduto> listar() {
        return repository.findAll();
    }
  
    public TipoProduto criar(String nome) {
        TipoProduto tipo = new TipoProduto(nome);
        return repository.save(tipo);
    }
}
```

#### 60-75 min: Criar DTOs para TipoProduto

Arquivo: src/main/java/br/unifor/produtosapi/dto/TipoProdutoRequest.java

```java
package br.unifor.produtosapi.dto;

import jakarta.validation.constraints.NotBlank;

public class TipoProdutoRequest {
  
    @NotBlank(message = "Nome nao pode estar vazio")
    private String nome;
  
    public String getNome() {
        return nome;
    }
  
    public void setNome(String nome) {
        this.nome = nome;
    }
}
```

#### 75-90 min: Teste de execucao

Rodar:

```
mvn clean
mvn spring-boot:run
```

Checkpoint:

- Services criados e compilam sem erro.
- Projeto sobe normalmente.

---

## Aula 5 (90 min) - Controllers REST e Testes com Postman

### Parte 1: O que sao Endpoints REST (30 min)

#### O que é um Serviço REST?

REST = Representational State Transfer (Transferência de Estado Representacional).

É um estilo arquitetural para construir APIs web usando padrões HTTP.

Conceitos principais:

**Recurso:** Tudo é um recurso (Produto, TipoProduto, Usuário, etc).

- Cada recurso tem uma URL única (ex: `/produtos`, `/produtos/1`).
- Um recurso pode ter múltiplas representações (JSON, XML, etc).

**Estados e Operações:** Operações HTTP modificam o estado do recurso.

- GET = ler estado do recurso
- POST = criar novo recurso
- PUT/PATCH = modificar recurso existente
- DELETE = remover recurso

**Stateless (sem estado):** Cada requisição é independente.

- Servidor não guarda sessão do cliente.
- Cliente envia todas as informações necessárias em cada requisição.
- Facilita escalabilidade (qualquer servidor pode responder).

**Representação:** Recurso é transferido em formato (JSON, XML).

- Servidor retorna `Content-Type: application/json`.
- Cliente interpreta o formato recebido.

Exemplo prático:

```
Cliente quer ver Produto com id=5:
  GET /produtos/5
  |
Servidor retorna:
  {
    "id": 5,
    "nome": "Notebook",
    "preco": 3000.0,
    "tipo": "Eletrônico"
  }
```

Vantagens de REST:

- Simples de entender e usar.
- Aproveita toda a infraestrutura HTTP.
- Escalável (stateless).
- Independente de linguagem/plataforma.

#### O que é Swagger?

Swagger é uma ferramenta para documentar e testar APIs HTTP de forma interativa.

Na prática, o Swagger lê a especificação OpenAPI da aplicação e gera:

- uma documentação visual dos endpoints;
- exemplos de request/response;
- um formulário no navegador para enviar requisições diretamente.

Com Swagger, o aluno vê rapidamente:

- os métodos disponíveis (`GET`, `POST`, `DELETE`, etc);
- os parâmetros esperados;
- o formato JSON dos DTOs.

#### O que é OpenAPI?

OpenAPI é uma especificação padrão para descrever APIs REST. Ela define como escrever o contrato da API em JSON ou YAML, incluindo:

- os endpoints disponíveis;
- os verbos HTTP usados;
- os parâmetros e cabeçalhos;
- o corpo de request e response;
- os códigos de resposta.

Em outras palavras, o OpenAPI é o documento que descreve a API, e o Swagger é a interface que consome essa descrição e mostra a documentação/testes interativos.

#### Como configurar Swagger no Spring Boot

Para adicionar Swagger ao backend Spring Boot, basta incluir a dependência Springdoc OpenAPI no `pom.xml`:

```xml
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.2.0</version>
</dependency>
```

Depois de compilar e rodar a aplicação, o Swagger UI geralmente estará disponível em:

- `http://localhost:8080/swagger-ui/index.html`

E a documentação OpenAPI em JSON em:

- `http://localhost:8080/v3/api-docs`

Essa configuração funciona sem código extra em muitos casos, porque o Springdoc detecta automaticamente os controllers e os endpoints.

> Nota: Com o Swagger, você pode testar a API diretamente no navegador, sem precisar do Postman. Basta abrir o Swagger UI e enviar requisições `GET`, `POST`, `PUT` ou `DELETE` pelo formulário.

#### Verbos HTTP

GET = obter dados (nao modifica).
POST = criar dados.
PUT = atualizar dados (completo).
DELETE = remover dados.

#### URLs RESTful

Padrao:

```
GET /produtos -> lista todos
POST /produtos -> cria um
GET /produtos/{id} -> obtem um
DELETE /produtos/{id} -> deleta um
```

Nao fazer:

```
/obterProdutos
/criarProduto
/deletarProduto
```

Usar substantivos, nao verbos.

#### Codigos de resposta HTTP

- 200 OK = sucesso em GET
- 201 Created = sucesso em POST
- 400 Bad Request = dados invalidos
- 404 Not Found = recurso nao existe
- 500 Internal Server Error = erro no servidor

### Parte 2: Criar Controllers (60 min)

#### 00-15 min: Criar controller de TipoProduto

Arquivo: src/main/java/br/unifor/produtosapi/controller/TipoProdutoController.java

```java
package br.unifor.produtosapi.controller;

import br.unifor.produtosapi.domain.TipoProduto;
import br.unifor.produtosapi.dto.TipoProdutoRequest;
import br.unifor.produtosapi.service.TipoProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tipos")
public class TipoProdutoController {
  
    private final TipoProdutoService service;
  
    public TipoProdutoController(TipoProdutoService service) {
        this.service = service;
    }
  
    @GetMapping
    public List<TipoProduto> listar() {
        return service.listar();
    }
  
    @PostMapping
    public ResponseEntity<TipoProduto> criar(@Valid @RequestBody TipoProdutoRequest request) {
        TipoProduto tipo = service.criar(request.getNome());
        return ResponseEntity.status(HttpStatus.CREATED).body(tipo);
    }
}
```

#### 15-30 min: Criar controller de Produto

Arquivo: src/main/java/br/unifor/produtosapi/controller/ProdutoController.java

```java
package br.unifor.produtosapi.controller;

import br.unifor.produtosapi.dto.ProdutoRequest;
import br.unifor.produtosapi.dto.ProdutoResponse;
import br.unifor.produtosapi.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
  
    private final ProdutoService service;
  
    public ProdutoController(ProdutoService service) {
        this.service = service;
    }
  
    @GetMapping
    public ResponseEntity<List<ProdutoResponse>> listar() {
        return ResponseEntity.ok(service.listar());
    }
  
    @PostMapping
    public ResponseEntity<ProdutoResponse> criar(@Valid @RequestBody ProdutoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(request));
    }
  
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

#### 30-45 min: Testar API com Postman

1. Baixar Postman: https://www.postman.com/downloads/
2. Abrir aplicacao.
3. Rodar backend em terminal separado.
4. Create Request:

POST http://localhost:8080/tipos

Body (JSON):

```json
{
  "nome": "Eletronico"
}
```

Send.

Resposta esperada: codigo 201 e tipo criado.

5. Criar outro tipo.
6. GET http://localhost:8080/tipos -> lista ambos.
7. POST http://localhost:8080/produtos com tipo valido.
8. DELETE /produtos/{id}.

Checkpoint:

- Todas as operacoes funcionam no Postman.

#### 30-45 min: Testar API com Swagger

1. Certifique-se de que o backend esteja rodando.
2. Abra o navegador e acesse: `http://localhost:8080/swagger-ui/index.html`
3. Na interface do Swagger, localize o grupo de endpoints `/tipos`.
4. Encontre o POST `/tipos` e clique em "Try it out".
5. No corpo do request, use:

```json
{
  "nome": "Eletronico"
}
```

6. Clique em "Execute".
7. Verifique a resposta e o código HTTP 201.
8. Teste também o GET `/tipos`, POST `/produtos` e DELETE `/produtos/{id}` usando o Swagger.

Checkpoint:

- Todas as operacoes funcionam no Swagger UI.
- O Swagger mostra modelos de request e response automaticamente.

#### 45-60 min: Configurar CORS para futura integracao com Angular

#### O que é CORS (breve explicação)

CORS (Cross-Origin Resource Sharing) é o mecanismo usado pelos navegadores para controlar requisições entre origens diferentes (por exemplo, `http://localhost:4200` -> `http://localhost:8080`). Por padrão a Same‑Origin Policy bloqueia requisições cross‑origin; o servidor precisa retornar cabeçalhos CORS apropriados para permitir que o browser envie ou leia respostas.

Pontos importantes:

- `Access-Control-Allow-Origin`: origens permitidas (ex.: `http://localhost:4200` ou `*`).
- `Access-Control-Allow-Methods`: métodos permitidos (`GET, POST, PUT, DELETE`).
- `Access-Control-Allow-Headers`: cabeçalhos permitidos (`Content-Type`, `Authorization`).
- Requisições "não simples" disparam um preflight `OPTIONS` que o servidor deve responder com permissões.

No projeto, a configuração abaixo permite que o frontend Angular local (`http://localhost:4200`) faça requisições ao backend.

Arquivo: src/main/java/br/unifor/produtosapi/config/CorsConfig.java

```java
package br.unifor.produtosapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
  
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

#### 60-75 min: Commit no Git

No PowerShell:

```
git add .
git commit -m "aula5: controllers rest e endpoints completos"
```

#### 75-90 min: Revisao e duvidas

- Qual diferenca entre GET e POST?
- Por que 201 em POST?
- O que faz @Valid?
- O que é REST e quais são seus princípios básicos?
- O que é Swagger/OpenAPI e como ele gera documentação interativa?
- Qual a diferença prática entre testar com Postman e com Swagger UI?
- O que é CORS e por que precisamos configurá-lo para o frontend Angular?
- Quando usar POST vs PUT vs PATCH na API?
- Como mapear DTOs para entidades e por que não expor entidades diretamente?
- Como funcionam as validações com Bean Validation e como o Spring retorna erros?
- Quais códigos HTTP devemos usar para sucesso, criação, erro de validação e recurso não encontrado?

#### Respostas sugeridas (curtas)

- **Qual diferença entre GET e POST?**

  - `GET` recupera recursos (seguro, idempotente); `POST` cria recursos (não idempotente) e costuma enviar um body.
- **Por que 201 em POST?**

  - `201 Created` indica que um recurso foi criado com sucesso; a resposta costuma conter o header `Location` apontando para o novo recurso.
- **O que faz `@Valid`?**

  - Dispara a validação das anotações de Bean Validation no DTO; em caso de erro o Spring lança `MethodArgumentNotValidException` e retorna `400 Bad Request` por padrão (pode ser customizado).
- **O que é REST e quais são seus princípios básicos?**

  - REST (Representational State Transfer) é um estilo arquitetural: recursos identificados por URIs, uso de verbos HTTP, mensagens auto-descritivas, e statelessness (sem estado no servidor).
- **O que é Swagger/OpenAPI e como ele gera documentação interativa?**

  - OpenAPI é a especificação (contrato) da API em JSON/YAML; Swagger (UI) consome esse documento e gera uma interface interativa que mostra endpoints, modelos e permite enviar requisições.
- **Qual a diferença prática entre testar com Postman e com Swagger UI?**

  - `Postman` é um cliente HTTP completo (coleções, testes, ambientes, scripts). `Swagger UI` é uma documentação interativa gerada automaticamente para explorar e testar endpoints rapidamente.
- **O que é CORS e por que precisamos configurá-lo para o frontend Angular?**

  - CORS é um mecanismo de segurança do navegador que bloqueia requisições entre origens diferentes por padrão; o servidor precisa permitir explicitamente as origens/métodos para que o frontend (`http://localhost:4200`) faça chamadas ao backend.
- **Quando usar POST vs PUT vs PATCH na API?**

  - `POST` para criar; `PUT` para substituir/atualizar toda a representação (idempotente); `PATCH` para atualização parcial (apenas campos necessários).
- **Como mapear DTOs para entidades e por que não expor entidades diretamente?**

  - Mapear manualmente ou com bibliotecas (MapStruct/ModelMapper). Não exponha entidades porque elas carregam detalhes de persistência e podem permitir over-posting; DTOs decouplam contratos da API.
- **Como funcionam as validações com Bean Validation e como o Spring retorna erros?**

  - Anotações como `@NotBlank`, `@Positive` no DTO; `@Valid` no controller ativa a validação; Spring retorna `400 Bad Request` com detalhes de campos inválidos (personalizável via `@ControllerAdvice`).
- **Quais códigos HTTP devemos usar para sucesso, criação, erro de validação e recurso não encontrado?**

  - Sucesso: `200 OK`; Criação: `201 Created`; Erro de validação: `400 Bad Request`; Recurso não encontrado: `404 Not Found`.

## Aula 6 (90 min) - Frontend Angular Basico

### Parte 1: Conceitos Angular (30 min)

#### O que e Angular?

Framework TypeScript para criar interfaces web.

> **Este projeto usa Angular 21.2** (`@angular/core: ^21.2.0`).
> Angular 21 e a versao atual do framework e traz mudancas importantes em relacao a versoes anteriores (13 ou menos):
>
> | Caracteristica | Ate Angular 14 | Angular 15+ / 21 |
> |---|---|---|
> | Componentes | Necessitavam `NgModule` | **Standalone** por padrao (`standalone: true`) |
> | Bootstrap | `platformBrowserDynamic().bootstrapModule(AppModule)` | **`bootstrapApplication(App, appConfig)`** |
> | HTTP | `HttpClientModule` no imports do modulo | **`provideHttpClient()`** no `app.config.ts` |
> | Reatividade | Apenas RxJS/Observables | Tambem **Signals** (`signal()`, `computed()`, `effect()`) |
> | Control flow | `*ngIf`, `*ngFor` com `CommonModule` | Novo: **`@if`**, **`@for`** nativos no template |
> | Nomes de arquivo | `lista-produtos.component.ts` | **`lista-produtos.ts`** (sufixo `.component` removido) |
> | Build | `@angular-devkit/build-angular` | **`@angular/build`** (mais rapido, baseado em esbuild) |
> | Testes | Karma + Jasmine | **Vitest** (mais moderno, compativel com Node) |

TypeScript = JavaScript com tipagem (menos erros).

Componentes = blocos reutilizaveis.

Services = classes que compartilham dados/logica.

#### O que é TypeScript?

TypeScript é uma linguagem construída sobre JavaScript que adiciona tipagem estática opcional.

**JavaScript vs TypeScript:**

JavaScript:

```javascript
function somar(a, b) {
  return a + b;
}
somar(5, 10);    // 15 ✓
somar("5", 10);  // "510" (concatenação, erro silencioso!)
```

TypeScript:

```typescript
function somar(a: number, b: number): number {
  return a + b;
}
somar(5, 10);    // 15 ✓
somar("5", 10);  // Erro: Type 'string' is not assignable to type 'number' (detectado em desenvolvimento!)
```

**Benefícios de TypeScript:**

- **Tipagem estática:** declare tipos das variáveis, parâmetros, retornos; IDE detecta erros antes de executar.
- **IntelliSense melhorado:** editor sugere métodos/propriedades corretos (autocomplete).
- **Refatoração segura:** renomear variável/função afeta todas as referências.
- **Documentação automática:** tipos servem como documentação viva.
- **Interfaces e tipos:** defina contratos claros (ex: `interface Produto { nome: string; preco: number; }`).
- **Classes e herança:** suporte full a orientação a objetos.

**Como funciona:**

1. Escreva código em TypeScript (`.ts`).
2. Compilador TypeScript transpila para JavaScript (`.js`).
3. Navegador executa o JavaScript.

Em Angular, o TypeScript é obrigatório — componentes, services, etc são todas classes TypeScript tipadas.

**Exemplo prático em Angular:**

```typescript
// Define tipo da interface
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// Propriedade com tipo explícito
produtos: Produto[] = [];

// Método com tipagem completa
adicionarProduto(p: Produto): void {
  this.produtos.push(p);
}

// Sem TypeScript seria
// produtos = [];  // Type: any
// adicionarProduto(p) { this.produtos.push(p); }  // Sem validação
```

#### Conceitos fundamentais

**Módulos:** Organizam aplicação em blocos. Neste projeto Angular 21+ usamos componentes standalone em vez de um `AppModule` tradicional. A aplicação raiz é `app.ts` e o bootstrap é feito por `main.ts`.

> **Angular 21 — Standalone por padrao:** Todo componente gerado pelo CLI ja vem com `standalone: true`. Nao existe mais `app.module.ts`. Os providers globais (HttpClient, Router, FormsModule) sao configurados em `app.config.ts` e passados para `bootstrapApplication()` em `main.ts`.
>
> ```typescript
> // main.ts — Angular 21
> import { bootstrapApplication } from '@angular/platform-browser';
> import { appConfig } from './app/app.config';
> import { App } from './app/app';
>
> bootstrapApplication(App, appConfig);
> ```

**Signals (Angular 16+, padrao em Angular 21):** nova forma de reatividade primitiva. Diferente de variavel comum, um signal notifica o Angular automaticamente quando seu valor muda — sem precisar de RxJS.

```typescript
import { signal, computed } from '@angular/core';

// signal = valor reativo
titulo = signal('Produtos');

// computed = derivado automatico de outro signal
tituloMaiusculo = computed(() => this.titulo().toUpperCase());

// Ler: chame como funcao
console.log(this.titulo());         // 'Produtos'

// Escrever
this.titulo.set('Novo Titulo');
this.titulo.update(v => v + '!');
```

> O componente `App` ja usa signal: `protected readonly title = signal('produtos-web');`

**Dependency Injection (DI):** Padrão onde o framework injeta dependências (services) nos componentes. Reduz acoplamento. Ex: `constructor(private api: ProdutoApiService) { }`.

**Decoradores:** Anotações que adicionam metadados. `@Component` marca uma classe como componente; `@Injectable` marca um serviço; `@NgModule` marca um módulo.

**RxJS e Observables:**

RxJS é a biblioteca usada pelo Angular para programação reativa com streams de dados.

- `Observable` é uma sequência de valores no tempo; pode emitir zero, um ou múltiplos valores.
- Diferente de `Promise`, um `Observable` pode emitir muitos valores e também ser cancelado.
- HTTP em Angular retorna `Observable` porque a resposta chega no futuro e pode ser manipulada com operadores.

Exemplo:

```typescript
this.api.getProdutos()
  .subscribe(dados => this.produtos = dados);
```

- `.subscribe(...)` ativa o Observable e recebe os dados quando chegam.
- `pipe(...)` permite encadear operadores como `map`, `filter`, `catchError`.
- `Observable` é ótimo para eventos, requisições HTTP, tempo, formulários reativos e valores assíncronos.

**Ciclo de vida:** Componentes têm fases (criação, renderização, destruição).

- `ngOnInit`: chamado uma vez, após o componente ser criado.
- `ngOnDestroy`: chamado antes de destruir o componente (limpeza).
- Outros: `ngAfterViewInit`, `ngAfterContentInit`, `ngOnChanges`.

#### Estrutura basica Angular

```
app/
  main.ts = bootstrap da aplicação
  app/
    app.ts = componente raiz (standalone)
    app.html = template (HTML/Angular)
    app.css = estilos
    app.config.ts = configuração de providers e rotas
    app.routes.ts = definição de rotas
    services/
      produto-api.ts = serviço que chama API
    components/
      lista-produtos/
        lista-produtos.ts
        lista-produtos.html
        lista-produtos.css
```

#### Template syntax (HTML com Angular)

**Interpolação:** exibir variáveis

```html
<p>{{ nome }}</p>
```

**Event binding:** capturar clique

```html
<button (click)="salvar()">Salvar</button>
```

**Property binding:** passar valor a propriedade

```html
<input [value]="nome">
```

**Two-way binding:** capturar entrada (requer `FormsModule`)

```html
<input [(ngModel)]="nome">
```

**Diretivas:**

```html
<div *ngIf="mostraErro">Erro ao carregar</div>
<ul>
  <li *ngFor="let produto of produtos">{{ produto.nome }}</li>
</ul>
```

> **Angular 17+ — Novo control flow nativo (alternativa moderna):**
> A partir do Angular 17 existe uma sintaxe mais limpa, sem precisar importar `CommonModule`:
>
> ```html
> @if (mostraErro) {
>   <div>Erro ao carregar</div>
> }
>
> <ul>
>   @for (produto of produtos; track produto.id) {
>     <li>{{ produto.nome }}</li>
>   }
> </ul>
> ```
>
> Neste projeto usamos a sintaxe classica (`*ngIf`, `*ngFor`) com `CommonModule` para que o codigo seja mais facil de reconhecer para iniciantes e compativel com qualquer versao do Angular.

**Template reference (template local):**

```html
<input #campoNome>
<button (click)="usar(campoNome.value)">Usar valor</button>
```

#### Estrutura de um componente TypeScript

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',    // nome da tag HTML
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css']
})
export class ListaProdutosComponent implements OnInit {
  
  // Propriedades
  produtos: any[] = [];
  carregando: boolean = false;
  
  // Injetar serviço
  constructor(private api: ProdutoApiService) { }
  
  // Ciclo de vida
  ngOnInit(): void {
    this.carregar();
  }
  
  // Métodos
  carregar() {
    this.carregando = true;
    this.api.getProdutos().subscribe(
      dados => {
        this.produtos = dados;
        this.carregando = false;
      },
      erro => {
        console.error('Erro', erro);
        this.carregando = false;
      }
    );
  }
}
```

### Parte 2: Criar projeto Angular (60 min)

#### O que é ng (Angular CLI)?

`ng` é o Angular Command Line Interface — uma ferramenta de terminal que automatiza tarefas comuns de desenvolvimento Angular.

Foi instalada globalmente no computador com:

```powershell
npm install -g @angular/cli
```

Comandos principais:

- `ng new <nome>` — cria novo projeto Angular com toda a estrutura de pastas e dependências.
- `ng generate component <caminho>` (ou `ng g c`) — gera novo componente automaticamente.
- `ng generate service <caminho>` (ou `ng g s`) — gera novo serviço automaticamente.
- `ng serve` — inicia servidor de desenvolvimento (localhost:4200) com hot reload (recarrega automático quando edita).
- `ng build` — compila o projeto para produção em pasta `dist/`.
- `ng test` — executa testes unitários.

**Por que usar ng?**

Sem ng, você precisaria:

1. Criar arquivos `.ts`, `.html`, `.css` manualmente.
2. Escrever boilerplate (código repetitivo).
3. Registrar componentes e providers manualmente no módulo ou no bootstrap da aplicação.

Com ng, tudo é automático — economiza tempo e reduz erros.

**Exemplos de uso:**

```powershell
# Cria novo projeto
ng new meu-app

# Entra na pasta
cd meu-app

# Inicia servidor (porta 4200)
ng serve

# Em outra aba do PowerShell, gera componente
ng generate component components/lista

# Gera serviço
ng generate service services/api

# Build para produção
ng build --prod
```

#### 00-15 min: Gerar projeto

No PowerShell, na pasta frontend:

```powershell
cd frontend
ng new produtos-web --routing --style=css
cd produtos-web
ng serve
```

Flags explicadas:

- `--routing`: ativa suporte a roteamento no projeto.
- `--style=css`: usa CSS simples (sem SCSS/LESS).

Acessar: `http://localhost:4200`

Passos internos que o Angular CLI faz:

1. Cria pasta `produtos-web/` com estrutura básica.
2. Cria `src/` com componentes, services, módulos.
3. Cria `package.json` com dependências (Angular, TypeScript, RxJS).
4. Instala dependências automaticamente (`npm install`).
5. `ng serve` compila e roda servidor de desenvolvimento na porta 4200.

Checkpoint:

- App Angular abre sem erro.
- Mensagem "Welcome to produtos-web!" aparece.

#### 15-30 min: Criar servico de API

No PowerShell (na pasta `produtos-web`):

```powershell
ng generate service services/produto-api
```

Comando gera: `src/app/services/produto-api.ts` (se for criado manualmente, use este nome) e `src/app/services/produto-api.spec.ts` para testes.

Editar `src/app/services/produto-api.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Torna serviço singleton (uma instância global)
})
export class ProdutoApiService {
  
  private apiUrl = 'http://localhost:8080';  // URL do backend Spring Boot
  
  constructor(private http: HttpClient) { }  // Injeta HttpClient do Angular
  
  // GET: recupera todos os produtos
  // Observable: fluxo assíncrono de dados
  getProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produtos`);
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
```

Explicações importantes:

- `@Injectable({ providedIn: 'root' })`: torna o serviço injetável globalmente; o Angular cria uma única instância (singleton).
- `private http: HttpClient`: injeção de dependência; Angular passa `HttpClient` automaticamente.
- Cada método retorna `Observable<any>`: a resposta HTTP é um fluxo assíncrono que pode ser processado com `.subscribe()`.
- `Observable` não executa até ser inscrito (lazy evaluation).

#### 30-45 min: Configurar providers do Angular

Editar: `src/app/app.config.ts`

```typescript
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule)
  ]
};
```

Explicações:

- `provideHttpClient()`: habilita HttpClient no app, necessário para `ProdutoApiService`.
- `importProvidersFrom(FormsModule)`: habilita `NgModel` e formulários template-driven.
- `provideRouter(routes)`: habilita rotas.
- `provideBrowserGlobalErrorListeners()`: captura erros globais no browser.

Sem esses providers, o serviço e o formulário não funcionariam corretamente.

#### 45-60 min: Criar componentes

No PowerShell (na pasta `produtos-web`):

```powershell
ng generate component components/lista-produtos
ng generate component components/form-produto
```

O comando `ng generate component` cria:

- `.ts` (TypeScript com lógica);
- `.html` (template);
- `.css` (estilos);
- `.spec.ts` (testes automatizados).

E registra automaticamente os componentes no Angular, sem precisar de um `AppModule` tradicional, usando `bootstrapApplication` e providers no `app.config.ts`.

#### 60-75 min: Criar componente lista-produtos completo

Editar `src/app/components/lista-produtos/lista-produtos.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoApiService } from '../../services/produto-api';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-produtos.html',
  styleUrls: ['./lista-produtos.css']
})
export class ListaProdutosComponent implements OnInit {
  produtos: any[] = [];
  carregando = false;

  constructor(private api: ProdutoApiService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando = true;
    this.api.getProdutos().subscribe(
      dados => {
        let arr: any[] = [];
        if (Array.isArray(dados)) {
          arr = dados;
        } else if (dados && Array.isArray((dados as any).content)) {
          arr = (dados as any).content;
        } else if (dados && Array.isArray((dados as any).data)) {
          arr = (dados as any).data;
        }

        this.produtos = arr.map(p => ({
          ...p,
          tipo: p.tipo ?? (p.tipoNome ? { nome: p.tipoNome } : undefined)
        }));

        this.carregando = false;
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
```

Editar `src/app/components/lista-produtos/lista-produtos.html`:

```html
<h2>Produtos</h2>
<table border="1">
  <tr>
    <th>Nome</th>
    <th>Preco</th>
    <th>Tipo</th>
    <th>Acao</th>
  </tr>
  <tr *ngFor="let produto de produtos">
    <td>{{ produto.nome }}</td>
    <td>R$ {{ produto.preco }}</td>
    <td>{{ produto.tipoNome }}</td>
    <td>
      <button (click)="deletar(produto.id)">Deletar</button>
    </td>
  </tr>
</table>
```

Sintaxe usada:

- `standalone: true`: torna o componente independente, sem `AppModule`.
- `imports: [CommonModule]`: importa diretivas como `*ngIf` e `*ngFor`.
- `*ngFor="let produto of produtos"`: repete linha da tabela para cada produto.
- `{{ produto.nome }}`: interpolação para exibir o nome do produto.
- `{{ produto.tipoNome }}`: exibe o nome do tipo recebido diretamente do backend.
- `(click)="deletar(produto.id)"`: event binding que chama `deletar()` ao clicar.
- `deletar()`: chama a API, e ao concluir recarrega a lista automaticamente.

#### 75-90 min: Verificacao

Backend rodando na porta 8080.
Frontend rodando na porta 4200.
Lista de produtos aparece na tela em formato de tabela, e o botão Deletar remove o produto e recarrega a lista.

Checkpoint:

- Angular consome dados do backend via serviço.
- Componente exibe lista de produtos em tabela.
- Botão Deletar funciona: remove o produto e atualiza a lista automaticamente.
- Fluxo completo: backend API → serviço Angular → componente → template.
- A aplicação usa `bootstrapApplication(App, appConfig)` em vez de `AppModule`.

---

## Aula 7 (90 min) - CRUD Completo no Angular

### Parte 1: Formulario de cadastro (45 min)

Em `src/app/components/form-produto/form-produto.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoApiService } from '../../services/produto-api';

@Component({
  selector: 'app-form-produto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-produto.html',
  styleUrls: ['./form-produto.css']
})
export class FormProdutoComponent implements OnInit {
  nome = '';
  preco = 0;
  tipoId = 0;
  tipos: any[] = [];
  mensagem = '';

  constructor(private api: ProdutoApiService) { }

  ngOnInit(): void {
    this.carregarTipos();
  }

  carregarTipos() {
    this.api.getTipos().subscribe(
      dados => this.tipos = dados,
      erro => console.error('Erro ao carregar tipos', erro)
    );
  }

  salvar() {
    const novo = {
      nome: this.nome,
      preco: this.preco,
      tipoId: this.tipoId
    };

    this.api.criarProduto(novo).subscribe(
      () => {
        this.mensagem = 'Produto criado com sucesso!';
        this.nome = '';
        this.preco = 0;
        this.tipoId = 0;
      },
      erro => {
        this.mensagem = 'Erro ao criar produto: ' + erro.message;
      }
    );
  }
}
```

Em `src/app/components/form-produto/form-produto.html`:

```html
<h2>Cadastro de Produto</h2>
<form (ngSubmit)="salvar()">
  <div>
    <label>Nome:</label>
    <input type="text" [(ngModel)]="nome" name="nome" required>
  </div>
  
  <div>
    <label>Preco:</label>
    <input type="number" [(ngModel)]="preco" name="preco" required>
  </div>
  
  <div>
    <label>Tipo:</label>
    <select [(ngModel)]="tipoId" name="tipoId" required>
      <option value="">Selecione...</option>
      <option *ngFor="let tipo of tipos" [value]="tipo.id">
        {{ tipo.nome }}
      </option>
    </select>
  </div>
  
  <button type="submit">Cadastrar</button>
</form>

<p *ngIf="mensagem">{{ mensagem }}</p>
```

### Parte 2: Integrar componentes no app (45 min)

> O componente `lista-produtos` já está completo desde a Aula 6, incluindo o botão Deletar e o método `deletar()`. Nesta aula não é necessário alterá-lo.

Editar `src/app/app.html` para mostrar ambos:

```html
<h1>Sistema de Produtos</h1>
<app-form-produto></app-form-produto>
<app-lista-produtos></app-lista-produtos>
```

Checkpoint:

- CRUD completo funcionando no Angular.

---

## Aula 8 (90 min) - Revisao, Padroes e Entrega Final

### Parte 1: Repassar arquitetura (30 min)

Mapear no codigo:

- Controller: onde fica, qual papel.
- Service: onde fica, qual papel.
- Repository: onde fica, qual papel.
- DTO: qual diferenca da entidade.
- Component Angular: como chama API.
- Service Angular: como encapsula HTTP.

Dibujar no quadro o fluxo:

```
Usuario digita no navegador
    |
Componente Angular captura
    |
Service Angular faz HTTP
    |
Controller Spring recebe
    |
Service Spring executa logica
    |
Repository acessa banco
    |
Retorna JSON para tela
```

Perguntas guia:

1. Qual vantagem de separar em camadas?
2. Por que DTO em vez de expor entidade?
3. Se trocar banco de dados, quanto precisa mudar?
4. Se Angular nao consegue chamar API, por onde comeca diagnosis?

### Parte 2: Preparar entrega (60 min)

#### 00-15 min: Documento README

Arquivo: backend/produtos-api/README.md

```markdown
# Produtos API

## Como executar

1. Prerequisites: Java 17, Maven
2. Ir a pasta: backend/produtos-api
3. Executar: mvn spring-boot:run
4. Acessar: http://localhost:8080/h2-console
5. Endpoints disponiveis:
   - GET /tipos
   - POST /tipos
   - GET /produtos
   - POST /produtos
   - DELETE /produtos/{id}
```

Arquivo: frontend/produtos-web/README.md

```markdown
# Produtos Web

## Como executar

1. Prerequisites: Node LTS, Angular CLI
2. Ir a pasta: frontend/produtos-web
3. Executar: npm install (primeira vez)
4. Executar: ng serve
5. Acessar: http://localhost:4200
6. Backend deve estar rodando na porta 8080
```

#### 15-30 min: Documento de padroes

Arquivo: PADROES_APLICADOS.md

```markdown
# Padroes de Projeto Utilizados

## Backend

### MVC
- Controller: classe XXXController
- Service: classe XXXService
- Repository: interface XXXRepository
- Model: classe Entidade em domain

### Repository Pattern
- Abstrai acesso a dados via JpaRepository
- Trocar banco nao impactaria lógica de negocio

### Service Layer
- Regras de negocio centralizadas em XXXService
- Controllers delegam ao servico

### DTO
- ProdutoRequest para entrada
- ProdutoResponse para saida
- Desacopla entidade interna de API

## Frontend

### Service Layer
- ProdutoApiService encapsula chamadas HTTP
- Componentes delegam ao servico

### Observer Pattern
- RxJS Observables para fluxo assincrono
- .subscribe() para reagir a dados

### Component Architecture
- FormProduto: fornece entrada
- ListaProdutos: exibe saida
- Comunicacao via servico compartilhado

## Ganho Obtido

- Arquitetura em camadas facilita manutencao
- Separacao de responsabilidades
- Facil de testar cada camada isolada
- Facil de trocar persistencia ou interacao
```

#### 30-45 min: Relatorio executivo

Arquivo: RELATORIO.md

```markdown
# Relatorio do Trabalho

## Objetivo
Migrar projeto Java console para arquitetura web com Spring Boot no backend e Angular no frontend.

## Atividades Realizadas

1. Criacao de backend Spring Boot
   - Entidades JPA para Produto e TipoProduto
   - Validacoes de entrada
   - API REST CRUD completa
   - Tratamento de erros

2. Criacao de frontend Angular
   - Consumo de API via servicos HTTP
   - Listagem de produtos
   - Cadastro de novo produto
   - Exclusao de produto

3. Integracao ponta a ponta
   - CORS configurado
   - Dados sincronizados

## Dificuldades Encontradas

- Conceito de DTO nao era intuitivo inicialmente
- RxJS Observables requerem pratica
- Configuracao CORS exigiu pesquisa

## Melhorias Futuras

- Editar produto (PUT /produtos/{id})
- Paginacao na listagem
- Filtros de busca
- Autenticacao
- Testes unitarios

## Conclusao

A migracao para arquitetura web trouxe maior separacao de responsabilidades e facilita evolucao futura do sistema.
```

#### 45-60 min: Commit final

No PowerShell:

```
git add .
git commit -m "aula8: entrega final com documentacao completa"
git log
```

#### 60-75 min: Simulacao de apresentacao

Professor faz perguntas:

1. Por que usar DTO?
2. Qual diferenca entre Controller e Service?
3. Se precisar mudar banco para PostgreSQL, quanto de codigo muda?
4. Como o Angular sabe qual URL chamar?

#### 75-90 min: Feedback e fechamento

Professor avalia segundo rubrica:

- CRUD funcional: ___
- Organizacao: ___
- Padroes: ___
- Documentacao: ___
- Apresentacao: ___
- **Total: ___**

---

## Rubrica de Avaliacao (100 pontos)

| Criterio                | Pontos        | Descricao                                        |
| ----------------------- | ------------- | ------------------------------------------------ |
| CRUD funcional          | 35            | Backend + Frontend completamente funcional       |
| Organizacao em camadas  | 20            | Separacao clara Controller/Service/Repository    |
| Validacoes e tratamento | 15            | Validacoes de entrada e erros compreensivos      |
| Padroes de projeto      | 15            | Aplicacao correta de MVC, DTO, Service           |
| Documentacao            | 15            | README claro, relatorio e explicacao dos padroes |
| **TOTAL**         | **100** |                                                  |

---

## Dicas Finais para o Aluno

1. Rodar antes de commitar.
2. Se errcar, reler a mensagem de erro (sempre e clara).
3. Nao copiar codigo, entender cada linha.
4. Se ficar preso 15 min, pedir ajuda ao professor.
5. Testar com Postman antes de integrar com Angular.
6. Usar browser devtools (F12) para ver requests.

---

## Conclusao

Este roteiro de 8 aulas leves guia aluno desde instalacao ate entrega completa. Cada aula constroi conhecimento incremental sem sobrecarregar.

O foco e entender por que cada decisao arquitetural vale a pena, nao apenas "fazer funcionar".

Boa sorte!
