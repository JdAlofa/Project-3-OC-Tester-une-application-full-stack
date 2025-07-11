
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register a user', () => {
    const mockRegisterRequest: RegisterRequest = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    };

    service.register(mockRegisterRequest).subscribe();

    const req = httpTestingController.expectOne('api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRegisterRequest);
    req.flush(null);
  });

  it('should send a POST request to login a user and return session information', () => {
    const mockLoginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockSessionInformation: SessionInformation = {
      token: 'mockToken',
      type: 'Bearer',
      id: 1,
      username: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      admin: false,
    };

    service.login(mockLoginRequest).subscribe(sessionInfo => {
      expect(sessionInfo).toEqual(mockSessionInformation);
    });

    const req = httpTestingController.expectOne('api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockLoginRequest);
    req.flush(mockSessionInformation);
  });
});
