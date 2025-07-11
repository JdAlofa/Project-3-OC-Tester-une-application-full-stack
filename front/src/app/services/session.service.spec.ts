import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user and update session information', (done) => {
    const mockUser: SessionInformation = {
      token: 'testToken',
      type: 'Bearer',
      id: 1,
      username: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      admin: false,
    };

    service.$isLogged().subscribe((isLogged) => {
      if (isLogged) {
        expect(service.isLogged).toBeTruthy();
        expect(service.sessionInformation).toEqual(mockUser);
        done();
      }
    });

    service.logIn(mockUser);
  });

  it('should log out a user and clear session information', (done) => {
    // First, log in a user to set up the state
    service.logIn({
      token: 'testToken',
      type: 'Bearer',
      id: 1,
      username: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      admin: false,
    });

    service.$isLogged().subscribe((isLogged) => {
      if (!isLogged) {
        expect(service.isLogged).toBeFalsy();
        expect(service.sessionInformation).toBeUndefined();
        done();
      }
    });

    service.logOut();
  });

  it('should return the correct logged status', (done) => {
    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBeFalsy(); // Initially not logged in
      done();
    });
  });
});