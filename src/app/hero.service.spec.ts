import { TestBed, getTestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClient, HttpHandler, } from '@angular/common/http';
// (unit)test a component or a service without using an actual server implementation to handle HTTP requests
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => { // mocked version
  let injector: TestBed;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService],
      imports: [HttpClientTestingModule]
    });

    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

/*we can inject a reference to a HttpTestingController,
which will allow us to control our mocked HttpClient,
by setting expectations and returning fake data for testing purposes */
  it('should return an Observable<Hero[]>', () => {
    const nonHero = [
      {id: 10,
      name: 'Super Bat'}
    ];

// tslint:disable-next-line: deprecation
    service.getHeroes().subscribe(data => {
        console.log(data[0]);
        expect(data[0].name.length).toBeGreaterThan(0);
        expect(data[0].id).toBeDefined();
    });

    const req = httpMock.expectOne(`${service.heroesUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(nonHero);
  });
});
