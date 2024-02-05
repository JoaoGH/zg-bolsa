import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSimplesComponent } from './grafico-simples.component';

describe('GraficoSimplesComponent', () => {
  let component: GraficoSimplesComponent;
  let fixture: ComponentFixture<GraficoSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoSimplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
