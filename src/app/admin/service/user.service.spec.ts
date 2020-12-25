import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserService } from './user.service';
import { ClienteService } from '../cliente/service/cliente.service';
import { ClienteModel } from '../cliente/model/cliente-model';
import { User } from '../cliente/model/user';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {

  let injector: TestBed
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        UserService
      //  HttpClient, HttpTestingController,
      //  {provide: MAT_DIALOG_DATA, useValue: {}},
      //  { provide: MatDialogRef, useValue: {} },
    ]
    });
    // tener acceso a varialbes limpias antes de cada it
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController)
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(UserService);
  });

  afterEach(() => {
    // verificamos que no haya solicitudes pendientes
    httpMock.verify()
  })

  it('debe ser creado', () => {
    const service: UserService = TestBed.get(UserService)
    expect(service).toBeTruthy();
  });

  fit('Debe retornar un observable<Cliente[]>',()=>{
    //let service: UserService;
    const service: UserService = TestBed.get(UserService)
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
    service.getAll().subscribe((users: User[]) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUser)
      expect(users[0]).toBeDefined()
    });

    const req = httpMock.expectOne('https://api.github.com/users')
    expect(req.request.method).toBe('GET')
    req.flush(mockUser) // proporcionar valores ficticios como respuesta de nuestras peticiones

  })
});
