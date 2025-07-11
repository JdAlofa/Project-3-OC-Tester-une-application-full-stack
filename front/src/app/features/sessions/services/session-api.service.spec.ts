import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SessionApiService } from './session-api.service';
import { Session } from '../interfaces/session.interface';

describe('SessionApiService', () => {
  let service: SessionApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionApiService]
    });
    service = TestBed.inject(SessionApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all sessions', () => {
    const mockSessions: Session[] = [
      { id: 1, name: 'Session 1', description: 'Desc 1', date: new Date(), teacher_id: 1, users: [], createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Session 2', description: 'Desc 2', date: new Date(), teacher_id: 2, users: [], createdAt: new Date(), updatedAt: new Date() },
    ];

    service.all().subscribe(sessions => {
      expect(sessions).toEqual(mockSessions);
    });

    const req = httpTestingController.expectOne('api/session');
    expect(req.request.method).toBe('GET');
    req.flush(mockSessions);
  });

  it('should retrieve session detail by id', () => {
    const mockSession: Session = { id: 1, name: 'Session 1', description: 'Desc 1', date: new Date(), teacher_id: 1, users: [], createdAt: new Date(), updatedAt: new Date() };

    service.detail('1').subscribe(session => {
      expect(session).toEqual(mockSession);
    });

    const req = httpTestingController.expectOne('api/session/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockSession);
  });

  it('should delete a session by id', () => {
    service.delete('1').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('api/session/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should create a new session', () => {
    const newSession: Session = { id: 3, name: 'New Session', description: 'New Desc', date: new Date(), teacher_id: 1, users: [], createdAt: new Date(), updatedAt: new Date() };

    service.create(newSession).subscribe(session => {
      expect(session).toEqual(newSession);
    });

    const req = httpTestingController.expectOne('api/session');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSession);
    req.flush(newSession);
  });

  it('should update an existing session', () => {
    const updatedSession: Session = { id: 1, name: 'Updated Session', description: 'Updated Desc', date: new Date(), teacher_id: 1, users: [], createdAt: new Date(), updatedAt: new Date() };

    service.update('1', updatedSession).subscribe(session => {
      expect(session).toEqual(updatedSession);
    });

    const req = httpTestingController.expectOne('api/session/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSession);
    req.flush(updatedSession);
  });

  it('should allow a user to participate in a session', () => {
    service.participate('1', '1').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('api/session/1/participate/1');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeNull();
    req.flush(null);
  });

  it('should allow a user to unparticipate from a session', () => {
    service.unParticipate('1', '1').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne('api/session/1/participate/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});