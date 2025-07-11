
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService: UserService;
  let sessionService: SessionService;
  let router: Router;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    lastName: 'Doe',
    firstName: 'John',
    admin: true,
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const userServiceMock = {
      getById: jest.fn().mockReturnValue(of(mockUser)),
      delete: jest.fn().mockReturnValue(of(null)),
    };

    const sessionServiceMock = {
      sessionInformation: { id: 1 },
      logOut: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: { open: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    sessionService = TestBed.inject(SessionService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information', () => {
    const name = fixture.debugElement.query(By.css('p:nth-child(1)')).nativeElement;
    const email = fixture.debugElement.query(By.css('p:nth-child(2)')).nativeElement;

    expect(name.textContent).toContain('Name: John DOE');
    expect(email.textContent).toContain('Email: test@example.com');
  });

  it('should show admin message if user is admin', () => {
    const adminMessage = fixture.debugElement.query(By.css('.my2')).nativeElement;
    expect(adminMessage.textContent).toContain('You are admin');
  });

  it('should call delete method, logout and navigate on delete button click', async () => {
    component.user = { ...mockUser, admin: false };
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;
    deleteButton.click();

    expect(userService.delete).toHaveBeenCalledWith('1');
    expect(sessionService.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call window.history.back when back button is clicked', () => {
    const spy = jest.spyOn(window.history, 'back');
    const backButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    backButton.click();
    expect(spy).toHaveBeenCalled();
  });
});
