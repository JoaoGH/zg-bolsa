import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesPeriodoComponent } from './acoes-periodo.component';

describe('AcoesPeriodoComponent', () => {
  let component: AcoesPeriodoComponent;
  let fixture: ComponentFixture<AcoesPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcoesPeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcoesPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
