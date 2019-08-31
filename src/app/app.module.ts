import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KonvaModule } from 'ng2-konva';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LienzoComponent } from './components/lienzo/lienzo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LienzoComponent
  ],
  imports: [
    BrowserModule,
    KonvaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
