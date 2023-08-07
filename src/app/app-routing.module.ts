import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ArticleToVideoComponent } from './components/article-to-video/article-to-video.component';
import { MyVideosComponent } from './my-videos/my-videos.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : 'article-to-video' , component : ArticleToVideoComponent},
  { path : 'my-videos', component : MyVideosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
