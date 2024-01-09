import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CharacterComponent } from './components/character/character.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { StoreItemComponent } from './components/store-item/store-item.component';
import { InventoryItemComponent } from './components/inventory-item/inventory-item.component';
import {ChestComponent} from "./components/chest/chest.component";
import {IdleComponent} from "./pages/idle/idle.component";
import {QuestionsComponent} from "./pages/questions/questions.component";
import { GraphQLModule } from './graphql.module';
import {APOLLO_OPTIONS} from "apollo-angular";
import {InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    DashboardComponent,
    SidebarComponent,
    CharacterComponent,
    RightSidebarComponent,
    StoreItemComponent,
    InventoryItemComponent,
    ChestComponent,
    IdleComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink){
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://admin.stuvatar.nl/graphql',
            headers: new HttpHeaders({"X-Api-Key":"JHdLtwpZpL18nR0PspSpHBipEvdP1mbgS6vEV0EHmNDSAYkhVe"})
          }),
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
