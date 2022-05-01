import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexpandtableComponent } from './myexpandtable.component';

describe('MyexpandtableComponent', () => {
  let component: MyexpandtableComponent;
  let fixture: ComponentFixture<MyexpandtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyexpandtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyexpandtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
