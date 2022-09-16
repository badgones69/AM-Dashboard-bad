import {Injectable} from '@angular/core';
import {ROUTE_SERVICE_URL} from "../constants/services-constants";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Route} from "../models/route";
import {Airport} from "../models/airport";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) {}

  public getRoutes():Observable<Route[]> {
    return this.http.get<any[]>(`${ROUTE_SERVICE_URL}`);
  }

  public createRoute(departureHub: Airport, arrivalAirport: Airport): Observable<Route> {
    return this.http.post<any>(`${ROUTE_SERVICE_URL}`, {departureHub, arrivalAirport});
  }
}
