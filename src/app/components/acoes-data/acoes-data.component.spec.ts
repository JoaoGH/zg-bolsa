import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesDataComponent } from './acoes-data.component';

describe('AcoesDataComponent', () => {
  let component: AcoesDataComponent;
  let fixture: ComponentFixture<AcoesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcoesDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcoesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
