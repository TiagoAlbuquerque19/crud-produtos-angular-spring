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