import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddWaiverComponent } from './add-waiver/add-waiver.component';
import{FormsModule}from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { EditWaiverComponent } from './edit-waiver/edit-waiver.component';
import { SearchWaiverComponent } from './search-waiver/search-waiver.component';
import { waiverservice } from './waiverservices.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

const routes:Routes=[
  { path: 'AddWaiver', component: AddWaiverComponent },
  { path: 'EditWaiver/:waiverid', component: EditWaiverComponent },
  { path: 'searchWaiver', component: SearchWaiverComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    AddWaiverComponent,
    EditWaiverComponent,
    SearchWaiverComponent
  ],
  imports: [
    
    AgGridModule.withComponents([]),
    RouterModule.forRoot(routes),
    BrowserModule,FormsModule,
    HttpClientModule ,
    AgGridModule.withComponents([])
  ],
  providers: [waiverservice,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
