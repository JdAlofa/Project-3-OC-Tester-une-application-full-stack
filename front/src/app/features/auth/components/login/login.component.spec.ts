import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let sessionService: SessionService;
  
  const mockAuthService = {
    login: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  const mockSessionService = {
    logIn: jest.fn(),
  };

  beforeEach(async () => {
    // Reset mocks before each test to prevent state leakage
    mockAuthService.login.mockClear();
    mockRouter.navigate.mockClear();
    mockSessionService.logIn.mockClear();

    // TestBed is Angular's main testing utility. It creates a testing module that mimics the application's module.
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      // In the 'providers' array, we tell Angular's dependency injector to use our mock objects instead of the real services.
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionService, useValue: mockSessionService },
      ],
      // We import the same modules the component needs to function, like ReactiveFormsModule for forms and Material modules for UI.
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
    }).compileComponents(); // This compiles the component's template and CSS.

    // Create an instance of the component within the testing environment.
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // We can get the injected (mocked) services from the TestBed's injector to use them in our tests.
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    sessionService = TestBed.inject(SessionService);

    // This triggers change detection, which renders the component.
    fixture.detectChanges();
  });

  it('should create', () => {
    // This test simply checks if the component was successfully created.
    expect(component).toBeTruthy();
  });

  // This group of tests focuses on form validation.
  it('should have an invalid form when fields are empty', () => {
    // We check the form's 'valid' property. Since both fields are required and empty, it should be false.
    expect(component.form.valid).toBeFalsy();
  });

  it('should have an invalid email field when empty', () => {
    const email = component.form.controls['email'];
    // We expect the 'required' error to be present on the email control.
    expect(email.errors?.['required']).toBeTruthy();
  });

  it('should have an invalid email field for wrong format', () => {
    const email = component.form.controls['email'];
    email.setValue('not-an-email');
    // We expect the 'email' validator error to be present.
    expect(email.errors?.['email']).toBeTruthy();
  });

  it('should have an invalid password field when empty', () => {
    const password = component.form.controls['password'];
    
    expect(password.errors?.['required']).toBeTruthy();
  });

  // This test covers the successful login scenario.
  it('should call login service, log in session, and navigate on successful submit', () => {
    // Arrange: Set up the conditions for the test.
    const sessionInfo: SessionInformation = {
      token: 'token',
      type: 'type',
      id: 1,
      username: 'user',
      firstName: 'first',
      lastName: 'last',
      admin: false,
    };
    // We configure our mock service. When `login` is called, it should return an Observable that emits the sessionInfo.
    // `of()` from RxJS is a simple way to create an Observable that emits a value and then completes.
    mockAuthService.login.mockReturnValue(of(sessionInfo));

    // Act: Perform the action we want to test.
    // We set valid values for the form fields.
    component.form.setValue({
      email: 'test@test.com',
      password: 'password123',
    });
    // We call the submit method.
    component.submit();

    // Assert: Check if the results are what we expect.
    // We use matchers like '.toHaveBeenCalledWith' to verify that our mock functions were called with the correct arguments.
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123',
    });
    expect(sessionService.logIn).toHaveBeenCalledWith(sessionInfo);
    expect(router.navigate).toHaveBeenCalledWith(['/sessions']);
    expect(component.onError).toBeFalsy();
  });

  // This test covers the failed login scenario.
  it('should set onError to true on login failure', () => {
    // Arrange: Configure the mock service to return an error.
    // `throwError` from RxJS creates an Observable that immediately emits an error.
    mockAuthService.login.mockReturnValue(throwError(() => new Error('Login failed')));

    // Act: Set form values and submit.
    component.form.setValue({
      email: 'test@test.com',
      password: 'wrongpassword',
    });
    component.submit();

    // Assert: Check that the component handled the error correctly.
    expect(component.onError).toBeTruthy();
    // Also, ensure the success path was NOT taken.
    expect(sessionService.logIn).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});