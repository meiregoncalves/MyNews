import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http' ;
import { Noticia } from  '../../models/noticia';
import { Categoria } from '../../models/categoria';
import { Site } from '../../models/sites';
import { LocalStorageService } from 'angular-2-local-storage';
import { Cadastro_Feed } from '../../models/cadastro_Feeds';
import { NoticiasProvider } from '../database/noticias'
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

  constructor(public http: Http, private noticiasProvider : NoticiasProvider) {
  }

  public GetLocalNoticias()
  {
    return this.noticiasProvider.getAll();
  }

  public getNoticiasbyURL (noticia : Cadastro_Feed, localStorageService : LocalStorageService  )   {
     var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent ( noticia.url ) + '%22&format=json' ;
     var noticias : Noticia[] = [];

     return  this.http.get(url)
     .map(data => data.json() ['query'] ['results'])
     .map((res) => {
       if  ( res !=  null )   {
         let lista = res['item'] ;
         for (let i = 0 ; i < lista.length ; i ++ )   {
           let item = lista[i] ;
           let  noticiaatual  =  new  Noticia(item.title,item.link,false,false,noticia.categoria,noticia.site) ;
           noticias.push(noticiaatual);
           var validacao = new Noticia();
           this.noticiasProvider.getByURL(noticiaatual.url).then((noticia) => validacao = noticia);
           console.log("MEIRE" + validacao);
           if (validacao.url == "") {
             this.noticiasProvider.insert(noticiaatual);
           }
         }

         localStorageService.set("ultima_atualizacao", new Date());
       }

       return noticias
     } )
   }

}
