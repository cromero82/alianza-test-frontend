import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'app/admin/cliente/model/user';
import { UserService } from 'app/admin/service/user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { GeneralConfirmComponent } from './general-confirm.component';

describe('GeneralConfirmComponent', () => {
  let component: GeneralConfirmComponent;
  let fixture: ComponentFixture<GeneralConfirmComponent>;
  let servicio: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConfirmComponent ],
      providers: [
        UserService, GeneralConfirmComponent
      ],
      imports: [{
        HttpClientTestingModule
      }]
    })
    .compileComponents();
    servicio = TestBed.get(UserService);
    component = TestBed.get(GeneralConfirmComponent)
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(GeneralConfirmComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

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

  it('Funcion Par Debe retornal TRUE', () => {
    const respuesta = component.par(4);
    expect(respuesta).toBeTruthy()
  })

  it('Funcion Par Debe retornal FALSE', () => {
    const respuesta = component.par(17);
    expect(respuesta).toBeFalsy()
  })

  fit('Debe llamar UserService getAll() para obtener los usuarios', ()=>{
    let mockUser: User[] = [
      {
        login: "mojombo",
        id: 1,
        node_id: "MDQ6VXNlcjE=",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        url: "https://api.github.com/users/octocat",
        gravatar_id: "",
        disk_usage: 10000,
        collaborators: 8,
        two_factor_authentication: true,
        plan: {
          name: "Medium",
          space: 400,
          private_repos: 20,
          collaborators: 0
        }
      },
      {
        login: "defunkt",
        id: 2,
        node_id: "MDQ6VXNlcjE=",
        avatar_url: "https://github.com/images/error/octocat_happy2.gif",
        url: "https://api.github.com/users/octocat2",
        gravatar_id: "",
        disk_usage: 10000,
        collaborators: 8,
        two_factor_authentication: true,
        plan: {
          name: "Hight",
          space: 400,
          private_repos: 20,
          collaborators: 0
        }
      }
    ];
    const users = spyOn(servicio, 'getAll').and.callFake(
      //(users: any) => {
      //  users => {
        () => {
         // (users: User[]) => {
        return of(mockUser);
        })
    // component.ngOnInit();
    // expect(users).toHaveBeenCalled();
  })
});
