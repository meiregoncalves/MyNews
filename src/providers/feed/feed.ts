import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http' ;
import { Noticia } from  '../../models/noticia';
import { Categoria } from '../../models/categoria';
import { Site } from '../../models/sites';
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

  public getNoticiasbyURL (feedUrl: string, categoria : Categoria, site : Site )   {
     var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22' + encodeURIComponent ( feedUrl ) + '%22&format=json' ;
     var noticias : Noticia[] = [];
     return  this.http.get(url)
     .map(data => data.json() ['query'] ['results'])
     .map((res) => {
       if  ( res ==  null )   {
         return   noticias ;
       }

       let lista = res['item'] ;
       var length = 20 ;

       for (let i = 0 ; i < lista.length ; i ++ )   {
         let item = lista[i] ;
         var descricao = item.description.length > length ?
                                                           item.description.substring(0,80) + "..."   :
                                                           item. description ;
         let  noticiaatual  =  new  Noticia(item.title,'',item.link,false,descricao,categoria,site) ;
         noticias.push(noticiaatual);
       }
       return   noticias
     } )
   }

}
