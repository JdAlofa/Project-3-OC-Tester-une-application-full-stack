
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SessionApiService } from '../../services/session-api.service';
import { TeacherService } from '../../../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../../interfaces/session.interface';
import { Teacher } from '../../../../interfaces/teacher.interface';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let sessionApiService: SessionApiService;

  const mockSession: Session = {
    id: 1,
    name: 'Test Session',
    description: 'Test Description',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTeacher: Teacher = {
    id: 1,
    lastName: 'Doe',
    firstName: 'John',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const sessionApiServiceMock = {
      detail: jest.fn().mockReturnValue(of(mockSession)),
      delete: jest.fn().mockReturnValue(of({})),
      participate: jest.fn().mockReturnValue(of(undefined)),
      unParticipate: jest.fn().mockReturnValue(of(undefined)),
    };

    const teacherServiceMock = {
      detail: jest.fn().mockReturnValue(of(mockTeacher)),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
      ],
      declarations: [DetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: string) => '1',
              },
            },
          },
        },
        {
          provide: SessionService,
          useValue: {
            sessionInformation: {
              admin: true,
              id: 1,
            },
          },
        },
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide: TeacherService, useValue: teacherServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    sessionApiService = TestBed.inject(SessionApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display session information', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const teacherName = fixture.debugElement.query(By.css('mat-card-subtitle span')).nativeElement;
    const attendees = fixture.debugElement.query(By.css('div.my2 span')).nativeElement;
    const description = fixture.debugElement.query(By.css('div.description p')).nativeElement;

    expect(title.textContent).toContain('Test Session');
    expect(teacherName.textContent).toContain('John DOE');
    expect(attendees.textContent).toContain('0 attendees');
    expect(description.textContent).toContain('Description:');
  });

  it('should show delete button if user is admin', () => {
    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));
    expect(deleteButton).toBeTruthy();
  });

  it('should call delete method when delete button is clicked', () => {
    const spy = jest.spyOn(sessionApiService, 'delete');
    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;
    deleteButton.click();
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should call participate method when participate button is clicked', () => {
    component.isAdmin = false;
    fixture.detectChanges();
    const spy = jest.spyOn(sessionApiService, 'participate');
    const participateButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
    participateButton.click();
    expect(spy).toHaveBeenCalledWith('1', '1');
  });

  it('should call unParticipate method when unParticipate button is clicked', () => {
    component.isAdmin = false;
    component.isParticipate = true;
    fixture.detectChanges();
    const spy = jest.spyOn(sessionApiService, 'unParticipate');
    const unParticipateButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;
    unParticipateButton.click();
    expect(spy).toHaveBeenCalledWith('1', '1');
  });

  it('should call window.history.back when back button is clicked', () => {
    const spy = jest.spyOn(window.history, 'back');
    const backButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    backButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
