import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './pages/productlist/productlist.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductlistComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    ProductlistComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
