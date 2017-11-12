import { Categoria } from './categoria'
export class Noticia {
  id: number;

  imagem: string;
  url: string;
  favorito: boolean;
  comentario: string;
  descricao: string;
  categoria: Categoria;
  site: string;
  constructor(imagem:string, url:string, favorito: boolean, descricao: string, categoria: Categoria, site:string) {
    this.imagem = imagem;
    this.url = url;
    this.favorito = favorito;
    this.descricao = descricao;
    this.categoria = categoria;
    this.site = site;
  }
}
