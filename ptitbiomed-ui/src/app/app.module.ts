import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HelloComponent} from './hello/hello.component';
import {LoginComponent} from './auth/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {AccueilComponent} from './accueil/accueil.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {JwtInterceptor} from "./services/jwt.interceptor";
import {MatTreeModule} from "@angular/material/tree";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {ArticlesModule} from "./articles/articles.module";
import { NavbarContentComponent } from './layouts/navbar/navbar-content/navbar-content.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {CategoryViewerComponent} from "./category-viewer/category-viewer.component";

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    NavbarContentComponent,
    LogoutComponent,
    CategoryViewerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTreeModule,
    MatCheckboxModule,
    MatExpansionModule,
    ArticlesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
