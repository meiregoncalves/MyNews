import { Categoria } from './categoria'
import { Site } from './sites'

export class Noticia {
  id: number;
  titulo: string;
  url: string;
  favorito: boolean;
  lida: boolean;
  comentario: string;
  categoria: Categoria;
  site: Site;
  constructor(titulo: string, url:string, favorito: boolean, lida: boolean, categoria: Categoria, site:Site) {
    this.titulo = titulo;
    this.url = url;
    this.favorito = favorito;
    this.lida;
    this.categoria = categoria;
    this.site = site;
  }
}
