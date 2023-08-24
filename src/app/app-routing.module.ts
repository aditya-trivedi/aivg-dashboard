import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ArticleToVideoComponent } from './components/article-to-video/article-to-video.component';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : 'article-to-video' , component : ArticleToVideoComponent},
  { path : 'my-videos', component : MyVideosComponent},
  { path : 'contact', component : ContactUsComponent},
  { path : 'how-to-use', component : HomeComponentComponent},
  { path : '', component : HomeComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
