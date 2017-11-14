import { Categoria } from './categoria'
import { Site } from './sites'

export class Noticia {
  id: number;
  titulo: string;
  imagem: string;
  url: string;
  favorito: boolean;
  comentario: string;
  descricao: string;
  categoria: Categoria;
  site: Site;
  constructor(titulo: string, imagem:string, url:string, favorito: boolean, descricao: string, categoria: Categoria, site:Site) {
    this.titulo = titulo;
    this.imagem = imagem;
    this.url = url;
    this.favorito = favorito;
    this.descricao = descricao;
    this.categoria = categoria;
    this.site = site;
  }
}
