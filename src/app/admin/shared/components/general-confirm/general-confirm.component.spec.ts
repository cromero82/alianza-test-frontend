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
    let mockUser:User[] = [
      {
      login: "mojombo",
      id: 1,
      node_id: "MDQ6VXNlcjE=",
      avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/mojombo",
      html_url: "https://github.com/mojombo",
      followers_url: "https://api.github.com/users/mojombo/followers",
      following_url: "https://api.github.com/users/mojombo/following{/other_user}",
      gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
      starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
      organizations_url: "https://api.github.com/users/mojombo/orgs",
      repos_url: "https://api.github.com/users/mojombo/repos",
      events_url: "https://api.github.com/users/mojombo/events{/privacy}",
      received_events_url: "https://api.github.com/users/mojombo/received_events",
      type: "User",
      site_admin: false
    },
    {
      login: "defunkt",
      id: 2,
      node_id: "MDQ6VXNlcjI=",
      avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/defunkt",
      html_url: "https://github.com/defunkt",
      followers_url: "https://api.github.com/users/defunkt/followers",
      following_url: "https://api.github.com/users/defunkt/following{/other_user}",
      gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
      starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
      organizations_url: "https://api.github.com/users/defunkt/orgs",
      repos_url: "https://api.github.com/users/defunkt/repos",
      events_url: "https://api.github.com/users/defunkt/events{/privacy}",
      received_events_url: "https://api.github.com/users/defunkt/received_events",
      type: "User",
      site_admin: true
    }];


    const users = spyOn(servicio, 'getAll').and.callFake( () =>{
      return of(mockUser)
    } )

    component.ngOnInit();
    expect(users).toHaveBeenCalled();
  })

});
