import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  const mockAuthService = {
    register: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    // Reset mocks before each test
    mockAuthService.register.mockClear();
    mockRouter.navigate.mockClear();

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should be valid when all fields are filled correctly', () => {
    component.form.setValue({
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'password123',
    });
    expect(component.form.valid).toBeTruthy();
  });

  describe('submit', () => {
    beforeEach(() => {
      // Fill the form with valid data before each submit test
      component.form.setValue({
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'password123',
      });
    });

    it('should call authService.register and navigate to /login on successful registration', () => {
      // Arrange
      mockAuthService.register.mockReturnValue(of(undefined)); // Simulate successful registration (returns void)

      // Act
      component.submit();

      // Assert
      expect(authService.register).toHaveBeenCalledWith(component.form.value);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(component.onError).toBeFalsy();
    });

    it('should set onError to true on registration failure', () => {
      // Arrange
      mockAuthService.register.mockReturnValue(
        throwError(() => new Error('Registration failed'))
      );

      // Act
      component.submit();

      // Assert
      expect(authService.register).toHaveBeenCalledWith(component.form.value);
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onError).toBeTruthy();
    });

    it('should display error message when onError is true', () => {
      component.onError = true;
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error')).nativeElement;
      expect(errorMessage.textContent).toContain('An error occurred');
    });
  });
});