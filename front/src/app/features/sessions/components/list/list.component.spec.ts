import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { SessionService } from 'src/app/services/session.service';

import { ListComponent } from './list.component';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SessionApiService } from '../../services/session-api.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let sessionApiService: SessionApiService;

  const mockSessions: Session[] = [
    {
      id: 1,
      name: 'Test Session 1',
      description: 'Description 1',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Test Session 2',
      description: 'Description 2',
      date: new Date(),
      teacher_id: 2,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockSessionService = {
    sessionInformation: {
      admin: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatIconModule, RouterTestingModule],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        {
          provide: SessionApiService,
          useValue: {
            all: () => of(mockSessions),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    sessionApiService = TestBed.inject(SessionApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of sessions', () => {
    const sessionCards = fixture.debugElement.queryAll(By.css('.item'));
    expect(sessionCards.length).toBe(mockSessions.length);
  });

  it('should display "Create" and "Detail" buttons if user is admin', () => {
    const createButton = fixture.debugElement.query(By.css('button[routerLink="create"]'));
    const detailButtons = fixture.debugElement.queryAll(By.css('button[color="primary"]'));
    expect(createButton).toBeTruthy();
    expect(detailButtons.length).toBeGreaterThan(0);
  });

  it('should not display "Create" and "Edit" buttons if user is not admin', () => {
    mockSessionService.sessionInformation.admin = false;
    fixture.detectChanges();

    const createButton = fixture.debugElement.query(By.css('button[routerLink="create"]'));
    const editButtons = fixture.debugElement.queryAll(By.css('button[routerLink*="update"]'));

    expect(createButton).toBeFalsy();
    expect(editButtons.length).toBe(0);
  });
});