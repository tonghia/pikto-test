import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepaneComponent } from './sidepane.component';

describe('SidepaneComponent', () => {
  let component: SidepaneComponent;
  let fixture: ComponentFixture<SidepaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidepaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidepaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
