import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleToVideoComponent } from './article-to-video.component';

describe('ArticleToVideoComponent', () => {
  let component: ArticleToVideoComponent;
  let fixture: ComponentFixture<ArticleToVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleToVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleToVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
