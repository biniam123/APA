import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { HttpClientModule} from '@angular/common/http';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    HttpClientModule,
    FullwidthModule,
    MatFormFieldModule
  ],
  exports: [
    
  ],
  providers: [CdkScrollable,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


