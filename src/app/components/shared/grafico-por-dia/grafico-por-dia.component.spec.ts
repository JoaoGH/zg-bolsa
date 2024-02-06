import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPorDiaComponent } from './grafico-por-dia.component';

describe('GraficoPorDiaComponent', () => {
  let component: GraficoPorDiaComponent;
  let fixture: ComponentFixture<GraficoPorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPorDiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
