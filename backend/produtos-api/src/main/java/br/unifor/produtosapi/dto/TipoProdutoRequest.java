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