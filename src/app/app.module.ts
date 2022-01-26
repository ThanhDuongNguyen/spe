import { ImageComponent } from './widgets/image/image.component';
import { ColumnComponent } from './widgets/column/column.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageCreateComponent } from './landingpage-create/landingpage-create.component';
import { TitleComponent } from './widgets/title/title.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    LandingpageCreateComponent,
    ColumnComponent,
    TitleComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
