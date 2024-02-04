import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoDiaComponent } from './acao-dia.component';

describe('AcaoDiaComponent', () => {
  let component: AcaoDiaComponent;
  let fixture: ComponentFixture<AcaoDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcaoDiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcaoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
