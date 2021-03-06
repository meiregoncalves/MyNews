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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FavoritosPage,
    CategoriasPage,
    ConfiguracoesPage,
    NoticiasExibirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: 'MyNewsApp',
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
