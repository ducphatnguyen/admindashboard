import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { ShapeService } from './shape.service';
import { HttpClientModule } from '@angular/common/http';
import { PopupService } from './popup.service';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DashboardComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    SidenavComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     BrowserAnimationsModule,
     MatSidenavModule,
     MatToolbarModule,
     MatMenuModule,
     MatIconModule,
     MatDividerModule,
     MatListModule,
    FormsModule, // Add FormsModule to the imports array
    HttpClientModule,
    
  ],
  providers: [
    ShapeService,
    PopupService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
