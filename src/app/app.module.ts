import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule} from '@angular/material/tabs'
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSelectModule} from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatRadioModule } from '@angular/material/radio'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoginComponent } from './components/login/login.component';
import { ArticleToVideoComponent, PremiumAudioDialog } from './components/article-to-video/article-to-video.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyVideosComponent } from './my-videos/my-videos.component'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { FeedbackModalComponent } from './my-videos/FeedbackModal.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticleToVideoComponent,
    MyVideosComponent,
    PremiumAudioDialog,
    ContactUsComponent,
    HomeComponentComponent,
    FeedbackModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    DragDropModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
