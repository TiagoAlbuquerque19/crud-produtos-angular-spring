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

Framework JavaScript para fazer interfaces web.

Alternativas: React, Vue (mas aqui usamos Angular).

Por que Angular?

- Digitado (TypeScript, menos erros).
- Padronizado (bom para ensino).
- Ferramenta CLI poderosa.

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

#### 45-60 min: Configurar CORS para futura integracao com Angular

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

---

## Aula 6 (90 min) - Frontend Angular Basico

### Parte 1: Conceitos Angular (30 min)

#### O que e Angular?

Framework TypeScript para criar interfaces web.

TypeScript = JavaScript com tipagem (menos erros).

Componentes = blocos reutilizaveis.

Services = classes que compartilham dados/logica.

#### Estrutura basica Angular

```
app/
  app.module.ts = registra componentes
  app.component.ts = componente raiz
  app.component.html = template (HTML)
  app.component.css = estilos
```

#### Binding de dados

One-way: exibir valor

```html
<p>{{ nome }}</p>
```

Two-way: capturar entrada

```html
<input [(ngModel)]="nome">
```

Event binding: capturar clique

```html
<button (click)="salvar()">Salvar</button>
```

### Parte 2: Criar projeto Angular (60 min)

#### 00-15 min: Gerar projeto

No PowerShell, na pasta frontend:

```
cd frontend
ng new produtos-web --routing --style=css
cd produtos-web
ng serve
```

Acessar: http://localhost:4200

Checkpoint:

- App Angular abre sem erro.

#### 15-30 min: Criar servico de API

No PowerShell:

```
ng generate service services/produto-api
```

Arquivo gerado: src/app/services/produto-api.service.ts

Editar:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoApiService {
  
  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  
  getProdutos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produtos`);
  }
  
  criarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/produtos`, produto);
  }
  
  deletarProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produtos/${id}`);
  }
  
  getTipos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipos`);
  }
}
```

#### 30-45 min: Importar HttpClientModule

Editar: src/app/app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 45-60 min: Criar componentes

```
ng generate component components/lista-produtos
ng generate component components/form-produto
```

#### 60-75 min: Testar servico simples

Em lista-produtos.component.ts:

```typescript
import { Component, OnInit } from '@angular/core';
import { ProdutoApiService } from '../../services/produto-api.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  
  produtos: any[] = [];
  
  constructor(private api: ProdutoApiService) { }
  
  ngOnInit(): void {
    this.carregarProdutos();
  }
  
  carregarProdutos() {
    this.api.getProdutos().subscribe(
      dados => this.produtos = dados,
      erro => console.error('Erro ao carregar', erro)
    );
  }
}
```

Em lista-produtos.component.html:

```html
<h2>Produtos</h2>
<ul>
  <li *ngFor="let produto of produtos">
    {{ produto.nome }} - R$ {{ produto.preco }}
  </li>
</ul>
```

#### 75-90 min: Verificacao

Backend rodando na porta 8080.
Frontend rodando na porta 4200.
Lista aparece na tela.

Checkpoint:

- Angular consome dados do backend.

---

## Aula 7 (90 min) - CRUD Completo no Angular

### Parte 1: Formulario de cadastro (45 min)

Em form-produto.component.ts:

```typescript
import { Component, OnInit } from '@angular/core';
import { ProdutoApiService } from '../../services/produto-api.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.css']
})
export class FormProdutoComponent implements OnInit {
  
  nome: string = '';
  preco: number = 0;
  tipoId: number = 0;
  tipos: any[] = [];
  mensagem: string = '';
  
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

Em form-produto.component.html:

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

### Parte 2: Excluir e integrar componentes (45 min)

Adicionar metodo em lista-produtos.component.ts:

```typescript
deletar(id: number) {
  this.api.deletarProduto(id).subscribe(
    () => this.carregarProdutos(),
    erro => console.error('Erro ao deletar', erro)
  );
}
```

Atualizar lista-produtos.component.html:

```html
<h2>Produtos</h2>
<table border="1">
  <tr>
    <th>Nome</th>
    <th>Preco</th>
    <th>Tipo</th>
    <th>Acao</th>
  </tr>
  <tr *ngFor="let produto of produtos">
    <td>{{ produto.nome }}</td>
    <td>R$ {{ produto.preco }}</td>
    <td>{{ produto.tipoNome }}</td>
    <td>
      <button (click)="deletar(produto.id)">Deletar</button>
    </td>
  </tr>
</table>
```

Editar app.component.html para mostrar ambos:

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
