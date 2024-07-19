import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostPreviewComponent } from './create-post-preview.component';

describe('CreatePostPreviewComponent', () => {
  let component: CreatePostPreviewComponent;
  let fixture: ComponentFixture<CreatePostPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePostPreviewComponent]
    });
    fixture = TestBed.createComponent(CreatePostPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
