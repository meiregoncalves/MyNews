import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http' ;
import { Noticia } from  '../../models/noticia';
import { Categoria } from '../../models/categoria';
import { Site } from '../../models/sites';
import { LocalStorageService } from 'angular-2-local-storage';
import { Cadastro_Feed } from '../../models/cadastro_Feeds';
import   'rxjs/add/operator/map' ;

 export   class   Feed   {
   title :   string ;
   url :   string ;

   constructor ( title :   string ,   url :   string )   {
     this . title   =   title ;
     this . url   =   url ;
   }
 }

@Injectable()
export class FeedProvider {

  constructor(public http: Http) {
  }

  public GetLocalNoticias(localStorageService : LocalStorageService)
  {
    var items: Noticia[] = [];
    let array = JSON.parse(<string>localStorageService.get("noticias"));
    if (array != null) {
      for (let i = 0; i < array.length; i++) {
          let c = new Noticia(array[i].titulo, array[i].imagem, array[i].url, array[i].favorito, array[i].descricao, array[i].caategoria, array[i].site);
          items.push(c);
      }
    }
    return items;
  }

  public getNoticiasbyURL (noticia : Cadastro_Feed, localStorageService : LocalStorageService  )   {
    var ultima_atualizacao = localStorageService.get("ultima_atualizacao");
    if (ultima_atualizacao == null) {
      ultima_atualizacao = new Date();
    }

     var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent ( noticia.url ) + '%22&format=json' ;
     var noticias : Noticia[] = [];
     return  this.http.get(url)
     .map(data => data.json() ['query'] ['results'])
     .map((res) => {
       if  ( res !=  null )   {
         let lista = res['item'] ;
         var length = 20 ;
         for (let i = 0 ; i < lista.length ; i ++ )   {
           let item = lista[i] ;
           var descricao = item.description.length > length ?
                                                            item.description.substring(0,80) + "..."   :
                                                            item. description ;
           let  noticiaatual  =  new  Noticia(item.title,'',item.link,false,descricao,noticia.categoria,noticia.site) ;
           noticias.push(noticiaatual);
         }
         localStorageService.add("noticias", JSON.stringify(noticias));
         localStorageService.set("ultima_atualizacao", new Date());
       }

       noticias = this.GetLocalNoticias(localStorageService);
       return noticias
     } )
   }

}
