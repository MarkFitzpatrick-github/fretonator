import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { Component, DebugElement } from '@angular/core';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {

  const selectors = {
    logo: By.css('.header__siteLogo'),
    links: By.css('.header__linksItemLink'),
    hamburger: By.css(`.hamburger`),
    menu: By.css('.header__links')
  };

  const classNames = {
    menuHide: 'header__links--hide'
  };

  @Component({
    selector: 'app-header-spec',
    template: `
      <app-header></app-header>
    `
  })
  class HeaderComponentSpec {
  }

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponentSpec],
      imports: [RouterTestingModule, HeaderModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('Logo', () => {
    it('should have a link to the home page on the logo', () => {
      const logoElem = fixture.debugElement.query(selectors.logo);
      expect(logoElem.properties.href).toBe('/');
    });
  });

  describe('Links', () => {

    let home: DebugElement;
    let about: DebugElement;

    beforeEach(() => {
      const links = fixture.debugElement.queryAll(selectors.links);
      home = links[0];
      about = links[1];
    });

    it('Home should link to /', () => {
      expect(home.properties.href).toBe('/');
    });

    it('About should link to /about', () => {
      expect(about.properties.href).toBe('/about');
    });
  });

  describe('toggleMenu()', () => {
    let hamburger: DebugElement;
    let menu: DebugElement;

    beforeEach(() => {
      hamburger = fixture.debugElement.query(selectors.hamburger);
      menu = fixture.debugElement.query(selectors.menu);
      hamburger.nativeElement.click();
      fixture.detectChanges();
    });

    it('removes the hidden links modifier', () => {
      expect(menu.classes[classNames.menuHide]).toBeFalsy();
    });
  });
});
