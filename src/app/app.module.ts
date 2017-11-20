import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CategoriasPage } from '../pages/categorias/categorias';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { NoticiasExibirPage } from '../pages/noticias-exibir/noticias-exibir';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/* LocalStorage */
import { LocalStorageModule } from 'angular-2-local-storage';
import { FeedProvider } from '../providers/feed/feed';
import { HttpModule }   from   '@angular/http' ;
import { DatabaseProvider } from '../providers/database/database';
import { NoticiasProvider } from '../providers/database/noticias';
import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    console.log("URL: " + url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FavoritosPage,
    CategoriasPage,
    ConfiguracoesPage,
    NoticiasExibirPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'despesasApp',
      storageType: 'localStorage'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FavoritosPage,
    CategoriasPage,
    ConfiguracoesPage,
    NoticiasExibirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FeedProvider,
    SQLite,
    DatabaseProvider,
    NoticiasProvider
  ]
})
export class AppModule {}
