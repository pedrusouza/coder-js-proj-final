export class Produtos {
    constructor (nome, tipo, quantidade, tamanho, valor){
        this.nome = nome;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.tamanho = tamanho;
        this.valor = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
};