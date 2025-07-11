import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';


import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sessionService: SessionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [SessionService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method when logout button is clicked', () => {
    const spy = jest.spyOn(sessionService, 'logOut');
    jest.spyOn(sessionService, '$isLogged').mockReturnValue(of(true));
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('span[class="link"]:nth-child(3)'));
    logoutButton.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled();
  });
});