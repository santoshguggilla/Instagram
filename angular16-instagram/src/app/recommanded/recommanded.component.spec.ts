import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandedComponent } from './recommanded.component';

describe('RecommandedComponent', () => {
  let component: RecommandedComponent;
  let fixture: ComponentFixture<RecommandedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommandedComponent]
    });
    fixture = TestBed.createComponent(RecommandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
