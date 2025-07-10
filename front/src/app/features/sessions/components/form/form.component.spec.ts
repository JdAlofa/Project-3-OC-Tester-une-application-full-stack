import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SessionService } from '../../../../services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Session } from '../../interfaces/session.interface';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService: SessionApiService;
  let router: Router;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'sessions', component: FormComponent }]),
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: SessionService,
          useValue: {
            sessionInformation: {
              admin: true,
            },
          },
        },
        SessionApiService,
      ],
      declarations: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    sessionApiService = TestBed.inject(SessionApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create method when form is submitted for creation', () => {
    const spy = jest.spyOn(sessionApiService, 'create').mockReturnValue(of(mockSession));
    component.onUpdate = false;
    component.sessionForm?.setValue({
      name: 'Test Session',
      date: '2025-12-12',
      teacher_id: 1,
      description: 'Test Description',
    });
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call update method when form is submitted for update', () => {
    const spy = jest.spyOn(sessionApiService, 'update').mockReturnValue(of(mockSession));
    component.onUpdate = true;
    component.sessionForm?.setValue({
      name: 'Test Session',
      date: '2025-12-12',
      teacher_id: 1,
      description: 'Test Description',
    });
    component.submit();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable submit button when a required field is missing', () => {
    component.sessionForm?.setValue({
      name: '',
      date: '2025-12-12',
      teacher_id: 1,
      description: 'Test Description',
    });
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });
});