import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header/header.component';
import { LanguageSwitchComponent } from './core/header/language-switch/language-switch.component';
import { FooterComponent } from './core/footer/footer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainPageComponent } from './core/main-page/main-page.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { BoardComponent } from './boards/board/board.component';
import { BoardsListComponent } from './boards/boards-list/boards-list.component';
import { ColumnComponent } from './boards/board/column/column.component';
import { CardComponent } from './boards/board/card/card.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { ConfirmWindowComponent } from './core/modal/confirm-window/modal-window.component';
import { DEFAULT_DIALOG_CONFIG, Dialog, DialogRef } from '@angular/cdk/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './core/modal/add-task-modal/add-task-modal.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { StoreModule } from '@ngrx/store'
import { updateBoardReducer } from './boards/state/boards.reducer';
import { AddBoardModalComponent } from './core/modal/add-board-modal/add-board-modal.component';
import { AddColumnModalComponent } from './core/modal/add-column-modal/add-column-modal.component';
import { EditTaskModalComponent } from './core/modal/edit-task-modal/edit-task-modal.component'
import { TokenInterceptor } from './auth/token.interceptor';
import { InfoModalComponent } from './core/modal/info-modal/info-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './boards/dashboard/dashboard.component';
import { SearchbarComponent } from './core/header/searchbar/searchbar.component';
import { SearchResultsComponent } from './core/search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LanguageSwitchComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    MainPageComponent,
    PageNotFoundComponent,
    BoardComponent,
    BoardsListComponent,
    ColumnComponent,
    CardComponent,
    ConfirmWindowComponent,
    AddTaskModalComponent,
    ProfileComponent,
    AddBoardModalComponent,
    AddColumnModalComponent,
    EditTaskModalComponent,
    InfoModalComponent,
    DashboardComponent,
    SearchbarComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({boards: updateBoardReducer}),
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
