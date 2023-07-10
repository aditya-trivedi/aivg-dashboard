import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ArticleToVideoComponent } from './components/article-to-video/article-to-video.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path : 'article-to-video' , component : ArticleToVideoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
