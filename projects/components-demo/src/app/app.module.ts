import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonDemoModule } from './modules/button-demo/button-demo.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
