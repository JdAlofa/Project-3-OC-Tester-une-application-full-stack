import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user by id', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      lastName: 'Doe',
      firstName: 'John',
      admin: false,
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.getById('1').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('api/user/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should delete a user by id', () => {
    service.delete('1').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('api/user/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});