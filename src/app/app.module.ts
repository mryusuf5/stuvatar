import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    InventoryItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
