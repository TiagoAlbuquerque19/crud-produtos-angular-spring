package br.unifor.produtosapi.controller;

import br.unifor.produtosapi.domain.TipoProduto;
import br.unifor.produtosapi.repository.TipoProdutoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipos-produto")
public class TipoProdutoController {

    private final TipoProdutoRepository repository;

    public TipoProdutoController(TipoProdutoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TipoProduto> listar() {
        return repository.findAll();
    }

    @PostMapping
    public TipoProduto salvar(@RequestBody TipoProduto tipoProduto) {
        return repository.save(tipoProduto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
