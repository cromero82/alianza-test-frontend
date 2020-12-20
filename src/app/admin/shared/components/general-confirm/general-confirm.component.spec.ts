import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfirmComponent } from './general-confirm.component';

fdescribe('GeneralConfirmComponent', () => {
  let component: GeneralConfirmComponent;
  let fixture: ComponentFixture<GeneralConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    console.log("despues de cada prueba - afterEach()");
  })

  beforeEach(()=>{
    console.log("antes de cada prueba - feforeEach()");
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El saludo debe ser Hello World', ()=>{
    const valor = component.myVar;
    expect(valor).toEqual("Hello World");
  })

  it('Nombre contiene Carlos', ()=>{
    const nombre = component.nombrePersona;
    expect(nombre).toContain("Carlos");
  })

  fit('Funcion Par Debe retornal TRUE', () => {
    const respuesta = component.par(4);
    expect(respuesta).toBeTruthy()
  })

  fit('Funcion Par Debe retornal FALSE', () => {
    const respuesta = component.par(17);
    expect(respuesta).toBeFalsy()
  })
});
