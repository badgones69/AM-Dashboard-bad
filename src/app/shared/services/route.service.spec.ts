import {TestBed} from '@angular/core/testing';

import {RouteService} from './route.service';
import {HTTP_GET_REQUEST, HTTP_POST_REQUEST} from "../constants/services-constants";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Route} from "../models/route";
import {Airport} from "../models/airport";

describe('RouteService', () => {
  let service: RouteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(RouteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getRoutes should return all routes', () => {
    const routes: Route[] = [
      {
        id: 1,
        departureHub: {
          id: 1,
          iata: 'SSS',
          name: 'S',
          city: 'S',
          country: {id: 40, isoAlpha2: 'cn', name: 'CHINE'},
          region: null,
          hub: false
        },
        arrivalAirport: {
          id: 2,
          iata: 'TTT',
          name: 'T',
          city: 'T',
          country: {id: 46, isoAlpha2: 'kr', name: 'CORÉE DU SUD'},
          region: null,
          hub: true
        }
      },
      {
        id: 2,
        departureHub: {
          id: 3,
          iata: 'UUU',
          name: 'U',
          city: 'U',
          country: {id: 176, isoAlpha2: 'sn', name: 'SÉNÉGAL'},
          region: null,
          hub: false
        },
        arrivalAirport: {
          id: 4,
          iata: 'VVV',
          name: 'V',
          city: 'V',
          country: {id: 146, isoAlpha2: 'ug', name: 'OUGANDA'},
          region: null,
          hub: true
        }
      }
    ];

    service.getRoutes().subscribe(routes => {
      expect(routes.length).toEqual(2);
    });

    const req = httpTestingController.expectOne(request => request.method === HTTP_GET_REQUEST);
    req.flush(routes);
  });

  it('#createRoute should create a route and return it', () => {
    const departureHub: Airport = {
      id: 5,
        iata: 'WWW',
      name: 'W',
      city: 'W',
      country: {id: 66, isoAlpha2: 'fr', name: 'FRANCE'},
      region: null,
        hub: true
    };

    const arrivalAirport: Airport = {
      id: 6,
        iata: 'XXX',
        name: 'X',
        city: 'X',
        country: {id: 204, isoAlpha2: 'ua', name: 'UKRAINE'},
      region: null,
        hub: false
    };

    service.createRoute(departureHub, arrivalAirport).subscribe(routeCreated => {
      expect(routeCreated.departureHub != null).toBeTrue();
      expect(routeCreated.departureHub.id).toEqual(5);
      expect(routeCreated.arrivalAirport != null).toBeTrue();
      expect(routeCreated.arrivalAirport.id).toEqual(6);
    });

    const req = httpTestingController.expectOne(request => request.method === HTTP_POST_REQUEST);
    req.flush({departureHub: departureHub, arrivalAirport: arrivalAirport});
  });
});
